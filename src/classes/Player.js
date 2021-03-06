import Phaser from 'phaser'

export class Player extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame) 
        this.scene = scene;
        this.velocity = 160;
        // enable physics
        this.scene.physics.world.enable(this)
        //set immovable if another object collides with our player
        this.setImmovable(false)
        // scale our player
        this.setScale();
        // collide with world bounds
        this.setCollideWorldBounds(true);
        // add the player to our existing scene
        this.scene.add.existing(this)
    }

    update(cursors) {
        this.body.setVelocity(0);
        if(cursors.A.isDown) {
          this.body.setVelocityX(-this.velocity);
        } else if (cursors.D.isDown) {
          this.body.setVelocityX(this.velocity);
        } 
        if(cursors.W.isDown) {
          this.body.setVelocityY(-this.velocity);
        } else if (cursors.S.isDown) {
          this.body.setVelocityY(this.velocity);
        }
    }

    getSprite() {
      return this
    }
}