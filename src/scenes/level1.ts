import Constants from '../constants';
import Player from '../gameobjects/player';
import GameObject = Phaser.GameObjects.GameObject;

export default class Level1 extends Phaser.Scene {
    private width: number;
    private height: number;
    private lives: number;
    private score: number;
    private levelMap: Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private layerMapLevel: Phaser.Tilemaps.TilemapLayer;
    private imageBackground: Phaser.GameObjects.TileSprite;
    private player: Player;

    // tiempo nivel
    private seconds: number;
    private timeRemaining: number;
    private timeOut: boolean;

    constructor() {
        super(Constants.SCENES.LEVEL1);
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.lives = 3;
        this.score = 0;

        // inicializamos el juego
        this.registry.set(Constants.REGISTER.LIVES, this.lives);
        this.registry.set(Constants.REGISTER.SCORE, this.score);

        this.seconds = 1;
        this.timeRemaining = 10;
        this.timeOut = false;
    }

    preload() {}

    create() {
        // const logo = this.add.image(400, 70, 'logo1');

        /* const playGameTxt: Phaser.GameObjects.Text = this.add.text(50, this.height / 2, 'LEVEL 1', {
            fontSize: '32px',
            color: '#FFFFFF'
        });*/

        /*const livesTxt: Phaser.GameObjects.Text = this.add
            .text(this.width / 2, this.height / 2, 'Lives -', {
                fontSize: '32px',
                color: '#FFFFFF'
            })
            .setInteractive();

        livesTxt.on('pointerdown', () => {
            this.lives--;
            this.registry.set(Constants.REGISTER.LIVES, this.lives);
            this.events.emit(Constants.EVENTS.LIVES);
        });*/

        /*const scoreTxt: Phaser.GameObjects.Text = this.add
            .text(this.width / 2, this.height / 2 + 100, 'Score', {
                fontSize: '32px',
                color: '#FFFFFF'
            })
            .setInteractive();

        scoreTxt.on('pointerdown', () => {
            this.score++;
            this.registry.set(Constants.REGISTER.SCORE, this.score);
            this.events.emit(Constants.EVENTS.SCORE);
        });*/

        /* Cargar tilemap */
        this.levelMap = this.make.tilemap({ key: Constants.MAPS.LEVEL1.TILEMAPJSON, tileHeight: 16, tileWidth: 16 });
        this.physics.world.bounds.setTo(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels);

        //jugador
        this.levelMap.findObject(Constants.PLAYER.ID, (d: any) => {
            this.player = new Player({
                scene: this,
                x: d.x,
                y: d.y,
                texture: Constants.PLAYER.ID
            });
        });

        //las cámaras siguen al jugador
        this.cameras.main.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels);
        this.cameras.main.startFollow(this.player);

        this.tileSet = this.levelMap.addTilesetImage(Constants.MAPS.TILESET);

        this.layerMapLevel = this.levelMap.createLayer(Constants.MAPS.LEVEL1.LAYERPLATFORM, this.tileSet);
        this.layerMapLevel.setCollisionByExclusion([-1]);

        //Fondo
        this.imageBackground = this.add
            .tileSprite(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels, Constants.BACKGROUNDS.LEVEL1)
            .setOrigin(0, 0)
            .setDepth(-1);

        //Animaciones
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.IDLE,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.IDLE + '-',
                end: 11
            }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: Constants.PLAYER.ANIMATION.RUN,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.RUN + '-',
                end: 11
            }),
            frameRate: 20,
            repeat: -1
        });

        this.physics.add.collider(this.player as unknown as GameObject, this.layerMapLevel);

        //Crea sprite con posición final
        let objetofinal: any = this.levelMap.createFromObjects(Constants.MAPS.FINALPOSITION, {
            name: Constants.MAPS.FINALPOSITION
        })[0];
        this.physics.world.enable(objetofinal);
        objetofinal.body.setAllowGravity(false);
        objetofinal.setTexture(Constants.OBJECTS.FINAL);
        objetofinal.body.setSize(40, 50);
        objetofinal.body.setOffset(10, 15);

        //colisión para final del nivel
        this.physics.add.collider(this.player as unknown as GameObject, objetofinal, () => {
            this.scene.stop(Constants.SCENES.LEVEL1);
            this.scene.stop(Constants.SCENES.HUD);
            this.scene.start(Constants.SCENES.MENU);
        });

        /* this.tileSet = this.levelMap.addTilesetImage(Constants.MAPS.TILESET);
        this.layerMapLevel = this.levelMap.createLayer(Constants.MAPS.LEVEL1.LAYERPLATFORM, this.tileSet);
        this.layerMapLevel.setCollisionByExclusion([-1]);

        /!* Fondo *!/
        this.imageBackground = this.add
            .tileSprite(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels, Constants.BACKGROUNDS.LEVEL1)
            .setOrigin(0, 0)
            .setDepth(-1);

        /!* Animaciones *!/
        this.anims.create({
            key: Constants.PLAYER.ANIMATION.IDLE,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.IDLE + '-',
                end: 11
            }),
            frameRate: 20,
            repeat: -1
        });

        this.anims.create({
            key: Constants.PLAYER.ANIMATION.RUN,
            frames: this.anims.generateFrameNames(Constants.PLAYER.ID, {
                prefix: Constants.PLAYER.ANIMATION.RUN + '-',
                end: 12
            }),
            frameRate: 20,
            repeat: -1
        });

        /!* Crear jugador *!/
        this.player = new Player({ scene: this, x: 80, y: 80, texture: Constants.PLAYER.ID });

        this.physics.add.collider(this.player, this.layerMapLevel);*/
    }

    update(time) {
        // mover fondo
        this.imageBackground.tilePositionY -= 0.4;

        if (parseInt(this.registry.get(Constants.REGISTER.LIVES)) === 0) {
            this.scene.stop(Constants.SCENES.LEVEL1);
            this.scene.stop(Constants.SCENES.HUD);
            this.scene.start(Constants.SCENES.MENU);
        }

        this.player.update();

        // gestion de tiempo
        if (this.seconds != Math.floor(Math.abs(time / 1000)) && !this.timeOut) {
            this.seconds = Math.floor(Math.abs(time / 1000));
            this.timeRemaining--;
            let minutes: number = Math.floor(this.timeRemaining / 60);
            let seconds: number = Math.floor(this.timeRemaining - minutes * 60);

            let clockText: string =
                Phaser.Utils.String.Pad(minutes, 2, '0', 1) + Phaser.Utils.String.Pad(seconds, 2, '0', 1);
            // Registro
            this.registry.set(Constants.REGISTER.CLOCK, clockText);
            // Envío al HUD
            this.events.emit(Constants.EVENTS.CLOCK);

            // Cuando el tiempo termine, game over
            if (this.timeRemaining === 0) {
                this.timeOut = true;
                this.scene.stop(Constants.SCENES.LEVEL1);
                this.scene.stop(Constants.SCENES.HUD);
                this.scene.start(Constants.SCENES.MENU);
            }
        }
    }
}
