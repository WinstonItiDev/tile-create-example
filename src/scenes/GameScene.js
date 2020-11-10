
let p1 = null;
let p2 = null;
let map = null;
let overlappingTiles = [];
let rect = null
let worldPoint = null
let layer = null
let groundLayer = null

export class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    create() {
        map = this.make.tilemap({ key: 'map' })
        let tiles = map.addTilesetImage('cybernoid')
        layer = map.createDynamicLayer(0, tiles);
        groundLayer = map.createDynamicLayer(1, tiles)
        layer.setScale(2, 2);
        groundLayer.setScale(2, 2);

        map.setCollisionByExclusion(7);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.input.on('pointerdown', (pointer) => {
        })
    }

    update(time, delta) {

        if (this.input.activePointer.justDown) {
            let initialPoint = this.input.activePointer.positionToCamera(this.cameras.main)
            if (!p1) {
                p1 = initialPoint.clone()
            } else if (!p2) {
                // clone
            } else {
                // has data
                // null
            }
        }

        if (p1) {
            // declare the ground layer tile as 0
            // to utilize the alpha channel
            map.forEachTile(function (tile) {
                tile.index = 0
            });

            worldPoint = this.input.activePointer.positionToCamera(this.cameras.main)

            // just like in the phaser 3 get tiles in shape example
            overlappingTiles = [];

            let xStart = Math.min(p1.x - 5, worldPoint.x);
            let yStart = Math.min(p1.y - 5, worldPoint.y);
            let xEnd = Math.max(p1.x - 5, worldPoint.x);
            let yEnd = Math.max(p1.y - 5, worldPoint.y);

            rect = new Phaser.Geom.Rectangle(xStart, yStart, xEnd - xStart, yEnd - yStart);

            overlappingTiles = map.getTilesWithinShape(rect, groundLayer)

            // set tile index 
            overlappingTiles.forEach((tile) => {
                tile.index = 7
            })
        }

        // map.removeTileAtWorldXY(worldPoint.x, worldPoint.y)
        // if (this.input.activePointer.justDown) {
        //     p1 = worldPoint.clone()
        //     console.log(p1);
            // xStart = Math.min(0, worldPoint.x);
            // yStart = Math.min(0, worldPoint.y);
            // xEnd = Math.max(worldPoint.x, worldPoint.x);
            // yEnd = Math.max(worldPoint.y, worldPoint.y);

        // if (!p1) {
        //     p1 = worldPoint.clone()
        // } else if (!p2) {
        //     p2 = worldPoint.clone()
        // } else {
        //     p1 = worldPoint.clone()
        //     p2 = null
        // }

    }
}
