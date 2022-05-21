import Constants from '../constants';

export default class FinalLevels extends Phaser.Scene {
    private background: Phaser.GameObjects.TileSprite;
    private nameBackground: string;
    private nameLevel: string;
    private isWin: boolean;
    private score: number;

    constructor() {
        super(Constants.SCENES.FINALLEVEL);
    }

    init(data: any): void {
        this.nameBackground = data.nameBackground;
        this.nameLevel = data.nameLevel;
        this.isWin = data.isWin;
        this.score = data.score;
    }

    create(): void {
        // Background
        this.background = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, this.nameBackground).setOrigin(0, 0).setDepth(-1);

        // validar si gano o perdio
        if (this.isWin) {
            let scorePad: string = Phaser.Utils.String.Pad(this.score.toString(), 4, '0', 1);
            const winTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(100, 100, Constants.FONTS.BITMAP, Constants.ENDLEVEL.WIN, 40).setTint(0x8338ec);
            const scoreTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(100, 200, Constants.FONTS.BITMAP, Constants.ENDLEVEL.SCORE + scorePad, 20).setTint(0x8338ec);
        } else {
            // texto de perdio
            const loseTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(100, 100, Constants.FONTS.BITMAP, Constants.ENDLEVEL.GAMEOVER, 40).setTint(0xfb5607);
        }

        // boton para volver al menu
        const backTxt: Phaser.GameObjects.BitmapText = this.add.bitmapText(80, this.cameras.main.height - 100, Constants.FONTS.BITMAP, Constants.SETTINGS.BACK, 16)
            .setInteractive().on('pointerdown', () => {
                this.cameras.main.fade(700,0,0,0);
                this.cameras.main.on('camerafadeoutcomplete', () => {
                    this.scene.start(Constants.SCENES.MENU);
                });
            });
    }

    update(): void {
        this.background.tilePositionY -= 0.4;
    }
}
