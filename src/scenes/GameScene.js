
let p1 = null;
let p2 = null;
let map = null;
let overlappingTiles = [];
let rect = null
let firstPoint = null
let dragPoint = null
let groundLayer = null
let layer = null

export class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    create() {
        map = this.make.tilemap({ key: 'map' })
        let tiles = map.addTilesetImage('cybernoid')
        groundLayer = map.createDynamicLayer(0, tiles)
        groundLayer.setScale(2, 2);

        layer = map.createDynamicLayer(1, tiles)
        layer.setScale(2, 2)

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.input.on('pointerdown', () => {
            firstPoint = this.input.activePointer.positionToCamera(this.cameras.main)
            if (!p1) {
                p1 = firstPoint.clone()
                console.log(p1, p2);
            }
            else if (!p2) {
                p2 = firstPoint.clone()
                console.log(p1, p2);
            }
        })
    }

    update(time, delta) {
        if (p1) {
            // declare the ground layer tile as 0
            // to utilize the alpha channel
            map.forEachTile(function (tile) {
                tile.index = 0
            });

            dragPoint = this.input.activePointer.positionToCamera(this.cameras.main)

            overlappingTiles = [];

            let xStart = Math.min(p1.x - 5, dragPoint.x);
            let yStart = Math.min(p1.y - 5, dragPoint.y);
            let xEnd = Math.max(p1.x - 5, dragPoint.x);
            let yEnd = Math.max(p1.y - 5, dragPoint.y);

            rect = new Phaser.Geom.Rectangle(xStart, yStart, xEnd - xStart, yEnd - yStart);

            overlappingTiles = map.getTilesWithinShape(rect, layer)

            // set tile index to draw
            overlappingTiles.forEach((tile) => {
                tile.index = 7
            })

            // console.log(rect.height);
            // if (rect.width > 200) {
            // let result = overlappingTiles.filter((result) => {
            //     result > 5
            // })
            // }
        }
        if (p2) {
            p2 = false
            p1 = false
        }
    }
}

