import Constants from '../constants';
import GameObject = Phaser.GameObjects.GameObject;

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyWASD: any;
    private keySPACE: Phaser.Input.Keyboard.Key;

    scene: Phaser.Scene;

    constructor(config: any) {
        super(config.scene, config.x, config.y, config.texture);
        this.scene = config.scene;
        this.scene.physics.world.enable(this as unknown as GameObject);
        this.scene.add.existing(this as unknown as GameObject);

        this.body.setSize(20, 30);
        this.setCollideWorldBounds(true);

        /* Control entrada */
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.keyWASD = this.scene.input.keyboard.addKeys('W,A,S,D');
        this.keySPACE = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        this.play(Constants.PLAYER.ANIMATION.IDLE);
    }

    update() {
        // control de movimiento
        if (this.keyWASD.A.isDown || this.cursors.left.isDown) {
            this.setVelocityX(-200);
            if (this.body.blocked.down) {
                this.anims.play(Constants.PLAYER.ANIMATION.RUN, true);
            }
            this.flipX = true;
        } else if (this.keyWASD.D.isDown || this.cursors.right.isDown) {
            this.setVelocityX(200);
            if (this.body.blocked.down) {
                this.anims.play(Constants.PLAYER.ANIMATION.RUN, true);
            }
            this.flipX = false;
        } else {
            this.setVelocityX(0);
            this.anims.play(Constants.PLAYER.ANIMATION.IDLE, true);
        }

        if ((this.keySPACE.isDown || this.keyWASD.W.isDown || this.cursors.up.isDown) && this.body.blocked.down) {
            this.setVelocityY(-300);
            this.anims.stop();
            this.setTexture(Constants.PLAYER.ID, Constants.PLAYER.ANIMATION.JUMP);
        }
    }
}
