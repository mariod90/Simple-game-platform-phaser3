import Constants from '../constants';

export default class Load extends Phaser.Scene {
    private loadBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    constructor() {
        super(Constants.SCENES.LOAD);
    }

    preload(): void {
        this.cameras.main.setBackgroundColor(0x9fcc98);
        this.createBars();
        //Listener mientras se cargan los assets
        this.load.on(
            'progress',
            function (value: number) {
                this.progressBar.clear();
                this.progressBar.fillStyle(0x72a11d, 1);
                this.progressBar.fillRect(
                    this.cameras.main.width / 4,
                    this.cameras.main.height / 2 - 16,
                    (this.cameras.main.width / 2) * value,
                    16
                );
            },
            this
        );

        //Listener cuando se hayan cargado todos los assets
        this.load.on(
            'complete',
            () => {
                const fontJSON = this.cache.json.get(Constants.FONTS.JSON);
                this.cache.bitmapFont.add(Constants.FONTS.BITMAP, Phaser.GameObjects.RetroFont.Parse(this, fontJSON));
                // Carga de menu
                this.scene.start(Constants.SCENES.MENU);
            },
            this
        );

        this.loadAssets();
    }

    create() {
        // carga de ajustes iniciales
        this.registry.set(Constants.REGISTER.MUSIC, Constants.SETTINGS.SOUND_ON);
        this.registry.set(Constants.REGISTER.EFFECTS, Constants.SETTINGS.SOUND_ON);
    }

    private createBars(): void {
        this.loadBar = this.add.graphics();
        this.loadBar.fillStyle(0xffffff, 1);
        this.loadBar.fillRect(
            this.cameras.main.width / 4 - 2,
            this.cameras.main.height / 2 - 18,
            this.cameras.main.width / 2 + 4,
            20
        );
        this.progressBar = this.add.graphics();
    }

    private loadAssets() {
        this.load.path = 'assets/';

        // Carga de assets del juego
        this.load.image('logo1', 'phaser3-logo.png');

        // Mapas
        this.load.tilemapTiledJSON(Constants.MAPS.LEVEL1.TILEMAPJSON, 'levels/level1.json');
        this.load.tilemapTiledJSON(Constants.MAPS.LEVEL2.TILEMAPJSON, 'levels/level2.json');
        this.load.tilemapTiledJSON(Constants.MAPS.LEVEL3.TILEMAPJSON, 'levels/level3.json');
        this.load.image(Constants.MAPS.TILESET, 'levels/levelstileset.png');

        // Fondos
        this.load.image(Constants.BACKGROUNDS.LEVEL1, 'images/backgrounds/Brown.png');
        this.load.image(Constants.BACKGROUNDS.LEVEL2, 'images/backgrounds/Pink.png');
        this.load.image(Constants.BACKGROUNDS.LEVEL3, 'images/backgrounds/Blue.png');
        this.load.image(Constants.BACKGROUNDS.MENU, 'images/backgrounds/Green.png');

        // Fuentes
        this.load.json(Constants.FONTS.JSON, 'fonts/fuente.json');
        this.load.image(Constants.FONTS.IMAGE, 'fonts/imagenFuente.png');

        // Jugador
        this.load.atlas(Constants.PLAYER.ID, '' + 'images/player/ninjafrog.png', 'images/player/ninjafrog.json');

        // Objeto final
        this.load.image(Constants.OBJECTS.FINAL, 'images/objects/final.png');
        //this.load.atlas(Constants.PLAYER.ID, '' + 'images/player/ninjafrog.png', 'images/player/ninjafrog.json');

        //Enemigos
        this.load.spritesheet(Constants.ENEMIES.BUNNY.ID, 'images/enemies/bunny.png', {
            frameWidth: 34,
            frameHeight: 44
        });
        this.load.spritesheet(Constants.ENEMIES.CHICKEN.ID, 'images/enemies/chicken.png', {
            frameWidth: 32,
            frameHeight: 34
        });
        this.load.spritesheet(Constants.ENEMIES.MUSHROOM.ID, 'images/enemies/mushroom.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet(Constants.ENEMIES.RADISH.ID, 'images/enemies/radish.png', {
            frameWidth: 30,
            frameHeight: 38
        });

        // Explosion
        this.load.spritesheet(Constants.ENEMIES.EXPLOSION.ID, 'images/enemies/explosion.png', {
            frameWidth: 38,
            frameHeight: 38
        });

        // Plataformas moviles
        this.load.spritesheet(Constants.MOVILPLATFORM.ID, 'images/objects/movilplatform.png', {
            frameWidth: 38,
            frameHeight: 38
        });

        // Sonidos
        this.load.audio(Constants.SOUNDS.EFFECTS.JUMP, 'sounds/effects/saltar.ogg');
        this.load.audio(Constants.SOUNDS.EFFECTS.FALLONENEMY, 'sounds/effects/caersobre.ogg');
        this.load.audio(Constants.SOUNDS.EFFECTS.REMOVELIFE, 'sounds/effects/vida.ogg');
        this.load.audio(Constants.SOUNDS.EFFECTS.COLLECT, 'sounds/effects/recolectar.ogg');

        for (let i = 0; i <= 2; i++) {
            this.load.audio(Constants.SOUNDS.SOUNDTRACK + i, `sounds/soundtrack/cartoongame${i}.ogg`);
        }

        // recolectables
        this.load.spritesheet(Constants.HARVESTABLE.BANANA.ID, 'images/objects/banana.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet(Constants.HARVESTABLE.CHERRY.ID, 'images/objects/cherry.png', {
            frameWidth: 32,
            frameHeight: 32
        });
        this.load.spritesheet(Constants.HARVESTABLE.PINEAPPLE.ID, 'images/objects/pineapple.png', {
            frameWidth: 32,
            frameHeight: 32
        });

        // ajustes
        this.load.image(Constants.SETTINGS.SOUND_ON, 'images/objects/sonidoon.png');
        this.load.image(Constants.SETTINGS.SOUND_OFF, 'images/objects/sonidooff.png');

        // creditos
        this.load.image(Constants.CREDITS.GAMEDEV, 'images/objects/mariod90.png');
    }
}
