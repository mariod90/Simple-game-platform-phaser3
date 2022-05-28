import Constants from '../constants';
import HandlerBD from '../databse/handlerbd';

export default class Settings extends Phaser.Scene{
    private backgroundImage: Phaser.GameObjects.TileSprite;

    constructor(){
        super(Constants.SCENES.SETTINGS);
    }

    create(): void{
        let bd: HandlerBD = new HandlerBD();

        this.backgroundImage = this.add.tileSprite(0, 0, this.cameras.main.width as number, this.cameras.main.height as number, Constants.BACKGROUNDS.MENU);
        this.backgroundImage.setOrigin(0, 0).setDepth(-1);

        // boton para volver al menu
        const backTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, this.cameras.main.height - 100, Constants.FONTS.BITMAP, Constants.SETTINGS.BACK, 16)
        .setInteractive().on('pointerdown', () => {
            this.scene.start(Constants.SCENES.MENU);
        });

        // textos para botones de ajustes
        const musicTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, 80, Constants.FONTS.BITMAP, Constants.SETTINGS.MUSIC, 16).setInteractive();
        const effectsTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(200, 80, Constants.FONTS.BITMAP, Constants.SETTINGS.EFFECTS, 16).setInteractive();

        // boton para cambiar el sonido de la musica
        const musicOnOff: Phaser.GameObjects.Image = this.add.image(130,120, this.getSoundImage(bd.data.music)).setScale(0.5).setInteractive().on('pointerdown', () => {
            bd.data.music = !bd.data.music;
            bd.saveData();
            musicOnOff.setTexture(this.getSoundImage(bd.data.music));
        });

        const effectsOnOff: Phaser.GameObjects.Image = this.add.image(250,120, this.getSoundImage(bd.data.effects)).setScale(0.5).setInteractive().on('pointerdown', () => {
            bd.data.effects = !bd.data.effects;
            bd.saveData();
            effectsOnOff.setTexture(this.getSoundImage(bd.data.effects));
        });
    }

    update(): void{
        // movimiento scroll del fondo
        this.backgroundImage.tilePositionY -= 0.4;
    }

    private getSoundImage(on: boolean): string{
        return (on) ? Constants.SETTINGS.SOUND_ON : Constants.SETTINGS.SOUND_OFF;
    }
}
