
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
            console.log("pressing");
        })
    }

    update(time, delta) {

        // first declare the ground layer tile as 0
        // to utilize the alpha channel

        map.forEachTile(function (tile) {
            tile.index = 0
        });

        worldPoint = this.input.activePointer.positionToCamera(this.cameras.main)

        // just like in the phaser 3 get tiles in shape example
        overlappingTiles = [];

        rect = new Phaser.Geom.Rectangle(0, 0, worldPoint.x, worldPoint.y)

        overlappingTiles = map.getTilesWithinShape(rect, groundLayer)

        // set tile index 
        overlappingTiles.forEach((tile) => {
            tile.index = 7
        })

        if (!p1) {
            p1 = worldPoint.clone()
        }


        // map.removeTileAtWorldXY(worldPoint.x, worldPoint.y)


        // if (this.input.activePointer.justDown) {
        //     p1 = worldPoint.clone()
        //     console.log(p1);
        //     // xStart = Math.min(0, worldPoint.x);
        //     // yStart = Math.min(0, worldPoint.y);
        //     // xEnd = Math.max(worldPoint.x, worldPoint.x);
        //     // yEnd = Math.max(worldPoint.y, worldPoint.y);

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
