import Constants from '../constants';
import GameObject = Phaser.GameObjects.GameObject;
import Level1 from '../scenes/level1';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    private keyWASD: any;
    private keySPACE: Phaser.Input.Keyboard.Key;

    scene: Level1;
    timeWaitCollisionActive: boolean;
    collecting: boolean;

    private jumpAudio: Phaser.Sound.BaseSound;
    private fallOnAudio: Phaser.Sound.BaseSound;
    private collectAudio: Phaser.Sound.BaseSound;
    private lifeAudio: Phaser.Sound.BaseSound;

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
        this.timeWaitCollisionActive = false;
        this.collecting = false;

        this.jumpAudio = this.scene.sound.add(Constants.SOUNDS.EFFECTS.JUMP);
        this.fallOnAudio = this.scene.sound.add(Constants.SOUNDS.EFFECTS.FALLONENEMY);
        this.collectAudio = this.scene.sound.add(Constants.SOUNDS.EFFECTS.COLLECT);
        this.lifeAudio = this.scene.sound.add(Constants.SOUNDS.EFFECTS.REMOVELIFE);
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
            this.playSound(this.jumpAudio);
        }
    }

    public touchEnemy(player: Player, enemy: Phaser.Physics.Arcade.Sprite): void {
        // hace desaparecer al enemigo si salta sobre el
        if (player.body.velocity.y > 100 && enemy.body.touching.up && player.body.touching.down) {
            if (!player.timeWaitCollisionActive) {
                player.playSound(player.fallOnAudio);
                let posX = enemy.x;
                let posY = enemy.y;
                enemy.destroy();

                // incrementar puntuacion
                player.scene.score += 100;
                player.scene.registry.set(Constants.REGISTER.SCORE, player.scene.score);
                player.scene.events.emit(Constants.EVENTS.SCORE);

                // añadir efecto de explosion con animacion que cuando se completa, desaparece
                let explotion: Phaser.GameObjects.Sprite = player.scene.add.sprite(
                    posX,
                    posY,
                    Constants.ENEMIES.EXPLOSION.ID
                );
                explotion.play(Constants.ENEMIES.EXPLOSION.ANIM);
                explotion.once('animationcomplete', () => {
                    explotion.destroy();
                });
            }
        } else if (!player.timeWaitCollisionActive) {
            // quita vidas y actualiza HUD
            player.playSound(player.lifeAudio);
            player.scene.lives--;
            player.scene.registry.set(Constants.REGISTER.LIVES, player.scene.lives);
            player.scene.events.emit(Constants.EVENTS.LIVES);

            // activa tiempo de espera ya que al ser overlap esta colisionando constantemente
            player.timeWaitCollisionActive = true;
            // teñir de color rojo al jugador
            player.tint = 0xff0000;

            // evento para volver a la normalidad
            player.scene.time.addEvent({
                delay: 600,
                callback: () => {
                    player.timeWaitCollisionActive = false;
                    player.tint = 0xffffff;
                }
            });
        }
    }

    public collect(player: Player, object: Phaser.Physics.Arcade.Sprite): void {
        if (!player.collecting) {
            player.playSound(player.collectAudio);
            player.collecting = true;

            // incrementa marcador en 50 puntos
            player.scene.score += 50;
            player.scene.registry.set(Constants.REGISTER.SCORE, player.scene.score);
            player.scene.events.emit(Constants.EVENTS.SCORE);

            //player.soundCollect.play()
            // animacion para desparecer objeto
            player.scene.tweens.add({
                targets: object,
                y: object.y - 50,
                alpha: 0,
                duration: 800,
                ease: 'Cubic.easeOut',
                callbackScope: this,
                onComplete: function () {
                    player.collecting = false;
                    object.destroy();
                }
            });
        }
    }

    private playSound(sound: Phaser.Sound.BaseSound): void {
        if (this.scene.registry.get(Constants.REGISTER.EFFECTS) === Constants.SETTINGS.SOUND_ON) {
            sound.play();
        }
    }
}
