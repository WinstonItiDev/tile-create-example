
let p1 = null;
let p2 = null;
let map = null;
let overlappingTiles = [];
let rect = null
let firstPoint = null
let dragPoint = null
let groundLayer = null
let layer = null
let newStaticLayer = null

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
    }

    update(time, delta) {

        let pointer = this.input.activePointer
        if (pointer.justDown) {
            firstPoint = this.input.activePointer.positionToCamera(this.cameras.main)
            if (!p1) {
                p1 = firstPoint.clone()
            }
            else if (!p2) {
                p2 = firstPoint.clone()

            }
            console.log(p1, p2);
        }

        if (p1) {
            // declare the ground layer tile as 0
            // to utilize the alpha channel
            map.forEachTile(function (tile) {
                tile.index = 0
            });

            dragPoint = this.input.activePointer.positionToCamera(this.cameras.main)

            // just like in the phaser 3 get tiles in shape example
            overlappingTiles = [];

            let xStart = Math.min(p1.x - 5, dragPoint.x);
            let yStart = Math.min(p1.y - 5, dragPoint.y);
            let xEnd = Math.max(p1.x - 5, dragPoint.x);
            let yEnd = Math.max(p1.y - 5, dragPoint.y);

            rect = new Phaser.Geom.Rectangle(xStart, yStart, xEnd - xStart, yEnd - yStart);

            overlappingTiles = map.getTilesWithinShape(rect, groundLayer)

            // set tile index to draw
            overlappingTiles.forEach((tile) => {
                tile.index = 7
            })
        }
        if (p2) {
            // once triggered, convert dynamic layer to static layer
            newStaticLayer = map.convertLayerToStatic(groundLayer)
            // set scale to fit original dynamic layer
            newStaticLayer.setScale(2, 2)
            newStaticLayer.alpha = 0.2
            // reads new static layer object
            console.log(newStaticLayer);
            // disable this conditional, to stop from looping
            p2 = false
            p1 = false
            pointer.enabled = false
        }



    }
}

