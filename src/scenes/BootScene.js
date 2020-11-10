
import { StateMachine } from '../classes/StateMachine'
import { BootState, SplashState, GameState} from '../classes/State'

export class BootScene extends Phaser.Scene {
    constructor() {
        super('Boot')
    }

    preload() {

        // Holds all assets (sprites, sound)
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/maps/cybernoid.json');
        this.load.image('cybernoid', 'assets/tilemaps/tiles/tiles.png');

    }

    create() {
        // this.stateMachine = new StateMachine('boot', {
        //     boot: new BootState(),
        //     splash: new SplashState(),
        //     gamestate: new GameState()
        // }, [this, this.scene])

        this.scene.start('Game')

        // if (this.startGame == true) {
        // }


    }

    update() {
        // this.stateMachine.step();

    }
}