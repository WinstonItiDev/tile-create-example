
// on the boot scene, first screen is boot state,
// second is the splash state,
// third is the game state, which will start title scene

class State {
    enter() {
    }

    execute() {
    }
}

// let rectTileButton = null
// let dynamicLayer = null

export class IdleTileState extends State {
    enter(scene, map, tiles) {
        console.log("IDLE_TILE_STATE");
        this.rectTileButton = scene.add.image(40, 40, '')
        this.rectTileButton.setInteractive()
        this.rectTileButton.on('pointerdown', (pointer) => {
            this.rectTileButton.disableInteractive();
            
            let callback = () => {
                this.stateMachine.transition('pressed')
            }
            scene.time.delayedCall(100, callback)
        })


    }

    execute(scene) {


    }
}

let activePoints = null
let dragPoint = null
let p1, p2 = null
let overlappingTiles = null
let rect = null
let count = 1

export class PressedState extends State {
    enter(scene, map, tiles) {
        console.log("PRESSED_STATE");
        let dynamicLayer = map.createDynamicLayer(1, tiles)
        this.newDynamicLayer = dynamicLayer 
        this.newDynamicLayer.setScale(2, 2)
    }

    execute(scene, map) {
        let pointer = scene.input.activePointer
        if (pointer.justDown) {
            activePoints = scene.input.activePointer.positionToCamera(scene.cameras.main)

            // if (!p1) {
            //     p1 = activePoints.clone()
            // } else if (!p2) {
            //     p2 = activePoints.clone()
            // }

            if (!p1) {
                p1 = activePoints.clone()
            } else if (!p2) {
                p2 = activePoints.clone()
            } else {
                p1 = activePoints.clone()
                p2 = null
            }
            console.log(p1, p2);
        }

        if (p1) {
            map.forEachTile((tile) => {
                tile.index = 0
            })

            dragPoint = scene.input.activePointer.positionToCamera(scene.cameras.main)

            overlappingTiles = []

            let xStart = Math.min(p1.x - 5, dragPoint.x);
            let yStart = Math.min(p1.y - 5, dragPoint.y);
            let xEnd = Math.max(p1.x - 5, dragPoint.x);
            let yEnd = Math.max(p1.y - 5, dragPoint.y);

            rect = new Phaser.Geom.Rectangle(xStart, yStart, xEnd - xStart, yEnd - yStart);
            overlappingTiles = map.getTilesWithinShape(rect, this.newDynamicLayer)

            // set tile index to draw
            overlappingTiles.forEach((tile) => {
                tile.index = 7
            })

            if (p2 && p1) {
                // once triggered, convert dynamic layer to static layer
                let newStaticLayer = map.convertLayerToStatic(this.newDynamicLayer)
                // set scale to fit original dynamic layer
                newStaticLayer.setScale(2, 2)
                // newStaticLayer.alpha = 0.8
                // console log new static layer object
                console.log(newStaticLayer);
                // disable this conditional, to stop from looping
                p2 = false
                p1 = false
                this.stateMachine.transition('create')

            }
        }
    }
}

export class CreateTileState extends State {
    enter(scene) {
        console.log("CREATE_TILE_STATE");
        let callback = () => {
            this.stateMachine.transition('idle')
        }
        scene.time.delayedCall(100, callback)
    }

    execute(scene) {

    }
}

/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////
/////////////////////////////////////////////////

export class IdleState extends State {
    enter(scene, entity) {
        entity.anim = 0

    }

    execute(scene) {
        // setTimeout(this.stateMachine.transition('hostile'), 1000);
        let callback = () => {
            this.stateMachine.transition('hostile')
        }
        scene.time.delayedCall(1000, callback)
    }
}

export class HostileState extends State {
    enter(scene, entity) {
        entity.anim = 1

    }
    execute(scene) {
        let callback = () => {
            this.stateMachine.transition('idle')
        }
        scene.time.delayedCall(1000, callback)
    }
}

export class BootState extends State {
    enter(scene) {
        // we "enter" the first state here
        // all declared variables initial state eg. "sprite.anims.play('idle')"
        console.log('State: Boot')
        bootText = scene.add.text(40, 20, "Boot!")
    }

    execute(scene) {
        const { space } = scene.keys
        if (Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('splash')
            return;
        }
    }
    // that which is to be executed to change state ex. "this.stateMachine.transition('move')"
    // use an if statement ("if(keys.Z.isDown ){ this.stateMachine }")        
    // text2.on('pointerdown', () => {
    // this.stateMachine.transition('optionmenu')
    // console.log('state: options')
    // })
}
export class SplashState extends State {
    enter(scene) {
        console.log('State: Splash')
        bootText.destroy();
        splashText = scene.add.text(40, 20, "Splash!")

    }

    execute(scene) {
        const { space } = scene.keys

        // as before, we "enter" the state here
        // all declared variables initial state ex. (if not )
        // Transition to idle if not pressing movement keys

        // if (!(up.isDown || down.isDown)) {
        //     this.stateMachine.transition('idle');
        //     return;
        //   }
        // if (up.isDown) {
        // } else if (down.isDown) {
        //   }
        //   sprite.anims.play('walk', true);
        // text6.on('pointerdown', () => {
        //     this.stateMachine.transition('menu')
        // })
        if (Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition("gamestate")
            return;
        }
    }
}
export class GameState extends State {
    enter(scene, gameStart) {
        gameStart.start("Title")
        console.log('State: Title')
    }
    execute(scene, gameStart) {
    }
}
// For pausing the game and resuming that game
// export class PlayState extends State {
//     enter(scene) {
//         console.log("Game Play State!")
//         scene.cursors.W.enabled = true
//         scene.cursors.A.enabled = true
//         scene.cursors.S.enabled = true
//         scene.cursors.D.enabled = true


//     }
//     execute(scene) {
//         if (Phaser.Input.Keyboard.JustDown(scene.keyEsc)) { 
//             this.stateMachine.transition('paused')
//         }
//     }
// }
// export class PausedState extends State {
//     enter(scene) {
//         console.log("Game Paused State!")
//         scene.cursors.W.enabled = false
//         scene.cursors.A.enabled = false

//         scene.cursors.S.enabled = false
//         scene.cursors.D.enabled = false



//     }

//     execute(scene) {
//         if (Phaser.Input.Keyboard.JustDown(scene.keyEsc)) { 
//             this.stateMachine.transition('playing')
//         }
//     }
// }

// export class HideDebugState extends State {
//     enter(scene) {
//         console.log("Debug: Hidden");

//     }

//     execute(scene) {
//         if (Phaser.Input.Keyboard.JustDown(scene.keyTab)) { 
//             this.stateMachine.transition('showDebug')
//         }

//     }
// }

// export class ShowDebugState extends State {
//     enter(scene) {
//         console.log("Debug: Showing");

//     }
//     execute(scene) {
//         if (Phaser.Input.Keyboard.JustDown(scene.keyTab)) { 
//             this.stateMachine.transition('hidingDebug')
//         }
//     }
// }

// export class IdleState extends State {
//     enter(scene) {

//     }

//     execute(scene) {

//     }
// }

// export class MoveState extends State {
//     enter(scene) {

//     }

//     execute(scene) {

//     }
// }

// How to create a state
//
//     this.stateMachine.transition('idle');
//     function that will trigger to the next state
//
// class MenuState extends State {
//    enter(scene, sprite) {
//       we "enter"..
//    }
//    execute(scene, sprite) {
//       we "execute" to either the options state or exit game state
//    }
// }
//
// class OptionsState extends State {
//    enter(scene, sprite) {
//       we "enter"..
//    }
//    execute(scene, sprite) {
//       we "execute"
//    }
// }
//
// class ExitGameState extends State {
//    enter(scene, sprite) {
//       we "enter"..
//    }
//    execute(scene, sprite) {
//       we "execute"
//    }
// }


