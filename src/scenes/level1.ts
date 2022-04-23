import Constants from '../constants';
import Player from '../gameobjects/player';
import GameObject = Phaser.GameObjects.GameObject;
import Enemies from '../gameobjects/enemies';
import MobilePlatforms from '../gameobjects/mobileplatforms';
import Harvestable from '../gameobjects/harvestable';

export default class Level1 extends Phaser.Scene {
    private width: number;
    private height: number;
    public lives: number;
    public score: number;
    public levelMap: Phaser.Tilemaps.Tilemap;
    private tileSet: Phaser.Tilemaps.Tileset;
    private layerMapLevel: Phaser.Tilemaps.TilemapLayer;
    private imageBackground: Phaser.GameObjects.TileSprite;
    private player: Player;

    // tiempo nivel
    private seconds: number;
    private timeRemaining: number;
    private timeOut: boolean;

    // enemigos
    private bunnyGroup: Enemies;
    private chickenGroup: Enemies;

    // plataformas moviles
    private verticalPlatforms: MobilePlatforms;
    private horizontalPlatforms: MobilePlatforms;

    // sonido
    private levelSoundTrack: Phaser.Sound.BaseSound;

    // recolectable
    private bananaGroup: Harvestable;
    private pineappleGroup: Harvestable;
    private cherryGroup: Harvestable;

    constructor() {
        super(Constants.SCENES.LEVEL1);
    }

    init() {
        this.sound.stopAll();

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.lives = 3;
        this.score = 0;

        // inicializamos el juego
        this.registry.set(Constants.REGISTER.LIVES, this.lives);
        this.registry.set(Constants.REGISTER.SCORE, this.score);

        this.seconds = 1;
        this.timeRemaining = 300;
        this.timeOut = false;
    }

    preload() {
        // cargar sonidos
        this.levelSoundTrack = this.sound.add(Constants.SOUNDS.SOUNDTRACK + 1, { loop: true });
        this.levelSoundTrack.play();
    }

    create() {
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

        // animacion de explosion
        this.anims.create({
            key: Constants.ENEMIES.EXPLOSION.ANIM,
            frames: Constants.ENEMIES.EXPLOSION.ID,
            frameRate: 15,
            repeat: 0
        });

        this.physics.add.collider(this.player as unknown as GameObject, this.layerMapLevel);

        //Crea sprite con posición final
        let objetofinal: any = this.levelMap.createFromObjects(Constants.MAPS.FINALPOSITION, {
            name: Constants.MAPS.FINALPOSITION
        })[0];
        this.physics.world.enable(objetofinal);
        objetofinal.body.setAllowGravity(false);
        objetofinal.body.setImmovable(true);
        objetofinal.setTexture(Constants.OBJECTS.FINAL);
        objetofinal.body.setSize(40, 50);
        objetofinal.body.setOffset(10, 15);

        //colisión para final del nivel
        this.physics.add.collider(this.player as unknown as GameObject, objetofinal, () => this.backToMenu());

        // añade los enemigos obteniendolos de la capa de objetos del mapa
        this.bunnyGroup = new Enemies(
            this,
            Constants.MAPS.ENEMIES,
            Constants.ENEMIES.BUNNY.ID,
            Constants.ENEMIES.BUNNY.ANIM,
            Constants.ENEMIES.BUNNY.SPEED,
            {
                size: {
                    x: 30,
                    y: 30
                },
                offset: { x: 0, y: 10 }
            }
        );

        this.physics.add.collider(this.bunnyGroup as any, this.layerMapLevel);

        // @ts-ignore
        this.physics.add.overlap(this.player, this.bunnyGroup, this.player.touchEnemy, null, this);

        // Chicken group
        this.chickenGroup = new Enemies(
            this,
            Constants.MAPS.ENEMIES,
            Constants.ENEMIES.CHICKEN.ID,
            Constants.ENEMIES.CHICKEN.ANIM,
            Constants.ENEMIES.CHICKEN.SPEED,
            {
                size: {
                    x: 30,
                    y: 30
                },
                offset: { x: 0, y: 0 }
            }
        );

        this.physics.add.collider(this.chickenGroup as any, this.layerMapLevel);

        // @ts-ignore
        this.physics.add.overlap(this.player, this.chickenGroup, this.player.touchEnemy, null, this);

        // Plataformas moviles
        this.horizontalPlatforms = new MobilePlatforms(
            this,
            Constants.MAPS.MOBILEPLATFORMS,
            Constants.MOVILPLATFORM.ID,
            Constants.MOVILPLATFORM.SPEED,
            true
        );

        this.verticalPlatforms = new MobilePlatforms(
            this,
            Constants.MAPS.MOBILEPLATFORMS,
            Constants.MOVILPLATFORM.ID,
            Constants.MOVILPLATFORM.SPEED,
            false
        );
        // @ts-ignore
        this.physics.add.collider(this.player as any, [this.horizontalPlatforms, this.verticalPlatforms]);
        // @ts-ignore
        this.physics.add.collider(this.layerMapLevel as any, [this.horizontalPlatforms, this.verticalPlatforms]);

        // añadir recolectables
        this.bananaGroup = new Harvestable(
            this,
            Constants.MAPS.HARVESTABLE,
            Constants.HARVESTABLE.BANANA.ID,
            Constants.HARVESTABLE.BANANA.ANIM
        );
        // @ts-ignore
        this.physics.add.overlap(this.player, this.bananaGroup, this.player.collect, null, this);

        this.pineappleGroup = new Harvestable(
            this,
            Constants.MAPS.HARVESTABLE,
            Constants.HARVESTABLE.PINEAPPLE.ID,
            Constants.HARVESTABLE.PINEAPPLE.ANIM
        );
        // @ts-ignore
        this.physics.add.overlap(this.player, this.pineappleGroup, this.player.collect, null, this);

        this.cherryGroup = new Harvestable(
            this,
            Constants.MAPS.HARVESTABLE,
            Constants.HARVESTABLE.CHERRY.ID,
            Constants.HARVESTABLE.CHERRY.ANIM
        );
        // @ts-ignore
        this.physics.add.overlap(this.player, this.cherryGroup, this.player.collect, null, this);
    }

    update(time) {
        // mover fondo
        this.imageBackground.tilePositionY -= 0.4;

        this.player.update();
        this.bunnyGroup.update();
        this.chickenGroup.update();
        this.verticalPlatforms.update();
        this.horizontalPlatforms.update();

        // gestion de tiempo
        if (this.seconds != Math.floor(Math.abs(time / 1000)) && !this.timeOut) {
            this.seconds = Math.floor(Math.abs(time / 1000));
            this.timeRemaining--;
            let minutes: number = Math.floor(this.timeRemaining / 60);
            let seconds: number = Math.floor(this.timeRemaining - minutes * 60);

            let clockText: string =
                Phaser.Utils.String.Pad(minutes, 2, '0', 1) + ':' + Phaser.Utils.String.Pad(seconds, 2, '0', 1);
            // Registro
            this.registry.set(Constants.REGISTER.CLOCK, clockText);
            // Envío al HUD
            this.events.emit(Constants.EVENTS.CLOCK);

            // Cuando el tiempo termine, game over
            if (this.timeRemaining === 0) {
                this.timeOut = true;
            }
        }
        // Volver a menu
        if (this.lives === 0 || this.timeOut) {
            this.backToMenu();
        }
    }

    backToMenu(): void {
        this.cameras.main.fade(700, 0, 0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.sound.stopAll();
            this.scene.stop(Constants.SCENES.LEVEL1);
            this.scene.stop(Constants.SCENES.HUD);
            this.scene.start(Constants.SCENES.MENU);
        });
    }
}
