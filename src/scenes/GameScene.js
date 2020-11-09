
let p1 = null;
let p2 = null;
let map = null;

let overlappingTiles = [];
let rect = null
let worldPoint = null

export class GameScene extends Phaser.Scene {
    constructor() {
        super('Game')
    }

    create() {
        map = this.make.tilemap({ key: 'map' })
        let tiles = map.addTilesetImage('cybernoid')
        let layer = map.createDynamicLayer(0, tiles);
        layer.setScale(2, 2);

        map.setCollisionByExclusion(7);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)
    }

    update(time, delta) {
        worldPoint = this.input.activePointer.positionToCamera(this.cameras.main)

        overlappingTiles = [];

        rect = new Phaser.Geom.Rectangle(0, 0, worldPoint.x, worldPoint.y)
        overlappingTiles = map.getTilesWithinShape(rect)

        overlappingTiles.forEach((tile) => {
            if (tile) {
                tile.index = 1
            }
        })

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
