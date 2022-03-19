import Constants from '../constants';

export default class Menu extends Phaser.Scene {
    private width: number;
    private height: number;

    constructor() {
        super(Constants.SCENES.MENU);
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create() {
        const logo = this.add.image(this.width / 2, 70, 'logo1');
        const playGameTxt: Phaser.GameObjects.BitmapText = this.add
            .bitmapText(50, this.height / 2, Constants.FONTS.BITMAP, Constants.MENU.PLAY_GAME, 25)
            .setInteractive();
        this.changeScene(playGameTxt, Constants.SCENES.LEVEL1);
    }

    /**
     * Cuando se pulse sobre el texto nos envia a la escena indicada
     * @param playGameTxt
     * @param scene
     * @private
     */
    private changeScene(playGameTxt: Phaser.GameObjects.BitmapText, scene: string) {
        playGameTxt.on('pointerdown', () => {
            this.scene.start(scene);
            this.scene.start(Constants.SCENES.HUD);
            this.scene.bringToTop(Constants.SCENES.HUD);
        });
    }
}
