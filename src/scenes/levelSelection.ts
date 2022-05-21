import Constants from '../constants';

export default class LevelSelection extends Phaser.Scene{
    private backgroundImage: Phaser.GameObjects.TileSprite;

    constructor(){
        super(Constants.SCENES.LEVELSELECTION);
    }

    create(): void{
        this.backgroundImage = this.add.tileSprite(0, 0, this.cameras.main.width as number, this.cameras.main.height as number, Constants.BACKGROUNDS.MENU);
        this.backgroundImage.setOrigin(0, 0).setDepth(-1);

        // boton para volver al menu
        const backTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, this.cameras.main.height - 100, Constants.FONTS.BITMAP, Constants.SETTINGS.BACK, 16)
            .setInteractive().on('pointerdown', () => {
                this.scene.start(Constants.SCENES.MENU);
            });

        // botones para seleccionar nivel1
        const level1Txt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, 100, Constants.FONTS.BITMAP, Constants.SCENES.LEVEL1, 20).setInteractive()
        this.changeScene(level1Txt, Constants.SCENES.LEVEL1);

        const level2Txt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, 200, Constants.FONTS.BITMAP, Constants.SCENES.LEVEL2, 20).setInteractive()
        this.changeScene(level2Txt, Constants.SCENES.LEVEL2);

        const level3Txt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, 300, Constants.FONTS.BITMAP, Constants.SCENES.LEVEL3, 20).setInteractive()
        this.changeScene(level3Txt, Constants.SCENES.LEVEL3);

    }

    update(): void{
        // movimiento scroll del fondo
        this.backgroundImage.tilePositionY -= 0.4;
    }

    private changeScene(text: Phaser.GameObjects.BitmapText, newScene: string, hud: boolean = true) {
        text.on('pointerdown', () => {
            if(!hud){
                this.scene.start(newScene);
            }else{
                this.cameras.main.fade(700, 0, 0, 0);
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    // this.sound.stopAll();
                    this.scene.start(newScene);
                    // show hud scene
                    this.scene.start(Constants.SCENES.HUD, {levelName: newScene});
                    this.scene.bringToTop(Constants.SCENES.HUD);
                });
            }
        });
    }
}
