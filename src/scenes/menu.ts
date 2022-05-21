import Constants from '../constants';

export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;
    private backgroundImage: Phaser.GameObjects.TileSprite;

    constructor() {
        super(Constants.SCENES.MENU);
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.sound.stopAll();
    }

    create() {
        this.backgroundImage = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, Constants.BACKGROUNDS.MENU).setOrigin(0,0).setDepth(-1);
        const logo = this.add.image(this.width / 2, this.height / 2, Constants.PLAYER.ID, Constants.PLAYER.ANIMATION.JUMP).setScale(10);
        const title: Phaser.GameObjects.BitmapText = this.add
            .bitmapText(250, 50, Constants.FONTS.BITMAP, Constants.MENU.TITLE, 20);
        const playGameTxt: Phaser.GameObjects.BitmapText = this.add
            .bitmapText(50, this.height - 100, Constants.FONTS.BITMAP, Constants.MENU.PLAY_GAME, 20)
            .setInteractive();
        this.changeScene(playGameTxt, Constants.SCENES.LEVELSELECTION);

        const settingsTxt: Phaser.GameObjects.BitmapText = this.add
            .bitmapText(340, 500, Constants.FONTS.BITMAP, Constants.MENU.SETTINGS, 20)
            .setInteractive();
        this.changeScene(settingsTxt, Constants.SCENES.SETTINGS);

        const creditsTxt: Phaser.GameObjects.BitmapText = this.add
            .bitmapText(this.cameras.main.width - 200, 500, Constants.FONTS.BITMAP, Constants.MENU.CREDITS, 20)
            .setInteractive();
        this.changeScene(creditsTxt, Constants.SCENES.CREDITS);
    }

    update(): void{
        // movimiento scroll del fondo
        this.backgroundImage.tilePositionY -= 0.4;
    }

    /**
     * Cuando se pulse sobre el texto nos envia a la escena indicada
     * @param playGameTxt
     * @param scene
     * @private
     */
    private changeScene(text: Phaser.GameObjects.BitmapText, scene: string) {
        text.on('pointerdown', () => {
            this.scene.start(scene);
        });
    }
}
