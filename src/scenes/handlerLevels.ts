import Constants from '../constants';
import Player from '../gameobjects/player';
import Enemies from '../gameobjects/enemies';
import MobilePlatforms from '../gameobjects/mobileplatforms';
import Harvestable from '../gameobjects/harvestable';

export default class HandlerLevels extends Phaser.Scene {
    protected levelName: string;

    // vidas y puntuacion
    public lives: number;
    public score: number;

    // Mapa
    public levelMap: Phaser.Tilemaps.Tilemap;
    protected patternSet: Phaser.Tilemaps.Tileset;
    protected layerPlatformLevelMap: Phaser.Tilemaps.TilemapLayer;
    protected backgroundImage: Phaser.GameObjects.TileSprite;

    // Jugador
    protected player: Player;

    // Tiempo nivel
    protected seconds: number;
    protected timeLeft: number;
    protected timeOut: boolean;

    // enemigos
    protected enemyGroup: Enemies[];

    // plataformas moviles
    protected mobilePlatformsH: MobilePlatforms;
    protected mobilePlatformsV: MobilePlatforms;

    // Sonidos
    protected soundtrack: Phaser.Sound.BaseSound;

    // recolectables
    protected bananaGroup: Harvestable;
    protected pineappleGroup: Harvestable;
    protected cherriesGroup: Harvestable;

    constructor(level: string) {
        super(level);
        this.levelName = level;
    }

    /**
     * Inicializacion de la escena
     */
    init(): void {
        this.lives = 3;
        this.score = 0;
        this.timeOut = false;
        this.seconds = 0;
        this.timeLeft = 300;

        // Con el sistema de registro global de variables
        // inicializamos las del juego
        this.registry.set(Constants.REGISTER.LIVES, this.lives);
        this.registry.set(Constants.REGISTER.SCORE, this.score);

        this.enemyGroup = [];
    }

    preload(): void {
        // Carga de sonidos y lo ejecuta con loop
        this.soundtrack = this.sound.add(Constants.SOUNDS.SOUNDTRACK+1, {
            loop: true,
        });
        this.soundtrack.play();
    }

    /**
     * Metodo que completa el escenario y jugador
     * @param {string} jsonMap
     * @param {string} imageScrollable
     */
    createSceneLevel(jsonMap: string, imageScrollable): void {
        this.createLevelMap(Constants.MAPS.LEVEL1.TILEMAPJSON);

        this.createBackgroundScrollable(Constants.BACKGROUNDS.LEVEL1);

        this.createAnimations();

        this.createPlayer();

        this.createFinalObject();

        this.createMobilePlatforms();
    }

    /**
     * Metodo que crea el mapa en la escena con una capa de plataformas por defecto colisionable
     * @param {string} jsonMap ficher json del tileMap
     * @param {string} imageMap imagen tileset del mapa
     */
    createLevelMap(jsonMap: string, imageMap: string = Constants.MAPS.TILESET): void {
        //Crea mapa nivel
        this.levelMap = this.make.tilemap({ key: jsonMap });
        // los bordes del juego las dimensiones del mapa creado
        this.physics.world.bounds.setTo(0,0,this.levelMap.widthInPixels, this.levelMap.heightInPixels);
        // Imagen del conjunto de patrones asociada al mapa
        this.patternSet = this.levelMap.addTilesetImage(imageMap);
        // Capa de plataformas
        this.layerPlatformLevelMap = this.levelMap.createLayer(
            Constants.MAPS.LEVEL1.LAYERPLATFORM,
            this.patternSet
        );
        this.layerPlatformLevelMap.setCollisionByExclusion([-1]);
    }

    /**
     * Metodo que crea el fondo con una imagen scrollable vertical
     * @param {string} imageScrollable imagen del fondo
     */
    createBackgroundScrollable(imageScrollable: string): void {
        // Crea el fondo con una imagen scrollable
        this.backgroundImage = this.add.tileSprite(
            0,
            0,
            this.levelMap.widthInPixels,
            this.levelMap.heightInPixels,
            imageScrollable
        ).setOrigin(0, 0).setDepth(-1);
    }

    /**
     * Metodo que crea las animaciones
     */
    createAnimations(){
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
    }

    /**
     * Metodo que crea el objeto jugador y lo posiciona en el mapa
     */
    createPlayer(): void {
        // Obtiene posicion del jugador del mapa y crea jugador con esa posicion
        this.levelMap.findObject(
            Constants.PLAYER.ID, (d: any) => {
                this.player = new Player({ scene: this, x: d.x, y: d.y, texture: Constants.PLAYER.ID });
            }
        );

        // Las camaras siguen al jugador
        this.cameras.main.setBounds(0, 0, this.levelMap.widthInPixels, this.levelMap.heightInPixels);
        this.cameras.main.startFollow(this.player);

        // Se crea colision entre el jugador y la capa de plataformas
        this.physics.add.collider(this.player, this.layerPlatformLevelMap);
    }

    /**
     * Metodo que crea el objeto final del mapa
     */
    createFinalObject(){
        // Crea sprite con posicion final
        let finalObject: any = this.levelMap.createFromObjects(Constants.MAPS.FINALPOSITION, {name: Constants.MAPS.FINALPOSITION})[0];
        this.physics.world.enable(finalObject);
        finalObject.body.setAllowGravity(false);
        finalObject.setTexture(Constants.OBJECTS.FINAL);
        finalObject.body.setImmovable(true);
        finalObject.body.setSize(40, 50);
        finalObject.body.setOffset(10, 15);

        // colision para final del nivel
        this.physics.add.collider(this.player, finalObject, () => {
            this.backToMenu();
        });
    }

    /**
     * Vuelve al menu haciendo un fadeout de la camara parando musica, y las dos escenas HUD y la del nivel
     */
    backToMenu(){
        this.cameras.main.fadeOut(700, 0,0, 0);
        this.cameras.main.on('camerafadeoutcomplete', () => {
            this.sound.stopAll()
            this.scene.stop(this.levelName);
            this.scene.stop(Constants.SCENES.HUD);
            this.scene.start(Constants.SCENES.MENU);
        });
    }

    /**
     * Metodo que crea grupo de enemigos y los configura para que colisionen con el mapa y con el jugador
     */
    createEnemies(enemiesConfig: any[]): void {
        enemiesConfig.forEach(enemyConfig => {
            let enemies: Enemies = new Enemies(this, Constants.MAPS.ENEMIES, enemyConfig.ID, enemyConfig.ANIM, enemyConfig.SPEED);

            this.physics.add.collider(enemies as any, this.layerPlatformLevelMap);
            this.physics.add.overlap(this.player, enemies as any, this.player.touchEnemy, null, this);

            // agrega enemigos al grupo de enemigos
            this.enemyGroup.push(enemies);
        })
    }

    /**
     * Metodo que crea las plataformas mobiles en movimiento vertical y horizontal
     */
    createMobilePlatforms(){
        // Plataformas moviles
        this.mobilePlatformsH = new MobilePlatforms(
            this,
            Constants.MAPS.MOBILEPLATFORMS,
            Constants.MOVILPLATFORM.ID,
            Constants.MOVILPLATFORM.SPEED,
            true
        );

        this.mobilePlatformsV = new MobilePlatforms(
            this,
            Constants.MAPS.MOBILEPLATFORMS,
            Constants.MOVILPLATFORM.ID,
            Constants.MOVILPLATFORM.SPEED,
            false
        );

        // @ts-ignore
        this.physics.add.collider(this.player as any, [this.mobilePlatformsH, this.mobilePlatformsV]);

        // @ts-ignore
        this.physics.add.collider(this.layerPlatformLevelMap as any, [this.mobilePlatformsH, this.mobilePlatformsV]);
    }

    /**
     * Metodo que crea grupos de recolectables y los configura para que colisionen con el jugador
     * El nombre de la capa se debe llamar 'harvestables'
     */
    createHarvestables(harvestablesConfig: any[]): void {
        harvestablesConfig.forEach(harvestableConfig => {
            let harvestable: Harvestable = new Harvestable(this, Constants.MAPS.HARVESTABLE, harvestableConfig.ID, harvestableConfig.ANIM);

            this.physics.add.overlap(this.player, harvestable as any, this.player.collect, null, this);
        })
    }

    update(time: number, delta: number): void {
        // mover fondo
        this.backgroundImage.tilePositionY -= 0.4;

        this.player.update();
        this.enemyGroup.forEach(enemy => {
            enemy.update();
        });

        this.mobilePlatformsV.update();
        this.mobilePlatformsH.update();

        // gestion de tiempo
        if (this.seconds != Math.floor(Math.abs(time / 1000)) && !this.timeOut) {
            this.seconds = Math.floor(Math.abs(time / 1000));
            this.timeLeft--;
            let minutes: number = Math.floor(this.timeLeft / 60);
            let seconds: number = Math.floor(this.timeLeft - minutes * 60);

            let clockText: string =
                Phaser.Utils.String.Pad(minutes, 2, '0', 1) + ':' + Phaser.Utils.String.Pad(seconds, 2, '0', 1);
            // Registro
            this.registry.set(Constants.REGISTER.CLOCK, clockText);
            // Envío al HUD
            this.events.emit(Constants.EVENTS.CLOCK);

            // Cuando el tiempo termine, game over
            if (this.timeLeft === 0) {
                this.timeOut = true;
            }
        }
        // Volver a menu
        if (this.lives === 0 || this.timeOut) {
            this.backToMenu();
        }
    }
}

