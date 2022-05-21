import Constants from '../constants';

export default class Credits extends Phaser.Scene{
    private backgroundImage: Phaser.GameObjects.TileSprite;

    constructor(){
        super(Constants.SCENES.CREDITS);
    }

    create(): void{
        this.backgroundImage = this.add.tileSprite(0, 0, this.cameras.main.width as number, this.cameras.main.height as number, Constants.BACKGROUNDS.MENU);
        this.backgroundImage.setOrigin(0, 0).setDepth(-1);

        // boton para volver al menu
        const backTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, this.cameras.main.height - 100, Constants.FONTS.BITMAP, Constants.CREDITS.BACK, 16)
            .setInteractive().on('pointerdown', () => {
                this.scene.start(Constants.SCENES.MENU);
            });

        // agregar textos de creditos
        const createdByTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(70, 250, Constants.FONTS.BITMAP, Constants.CREDITS.CREATEBY, 16).setInteractive();
        const assetsTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(70, 350, Constants.FONTS.BITMAP, Constants.CREDITS.ASSETS, 16).setInteractive();

        // agregar logo
        const logo: Phaser.GameObjects.Image = this.add.image(350, 100, Constants.CREDITS.GAMEDEV);
        // cambiar tamaño del logo
        logo.setScale(0.35);
    }

    update(): void{
        // movimiento scroll del fondo
        this.backgroundImage.tilePositionY -= 0.4;
    }
}
