import Constants from '../constants';

export default class HUD extends Phaser.Scene {
    private livesTxt: Phaser.GameObjects.BitmapText;
    private scoreTxt: Phaser.GameObjects.BitmapText;
    private textClock: Phaser.GameObjects.BitmapText;
    private width: number;
    private height: number;
    private nameLevel: string;

    constructor() {
        super(Constants.SCENES.HUD);
    }

    init(data: any): void {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
        this.nameLevel = data.nameLevel;
    }

    create() {
        const level: Phaser.Scene = this.scene.get(this.nameLevel);
        level.events.on(Constants.EVENTS.LIVES, this.updateLives, this);
        level.events.on(Constants.EVENTS.SCORE, this.updateScore, this);
        level.events.on(Constants.EVENTS.CLOCK, this.updateClock, this);

        this.livesTxt = this.add.bitmapText(
            20,
            20,
            Constants.FONTS.BITMAP,
            Constants.HUD.LIVES + this.registry.get(Constants.REGISTER.LIVES),
            20
        );

        this.scoreTxt = this.add.bitmapText(this.width - 50, 20, Constants.FONTS.BITMAP, '000', 20);

        this.textClock = this.add.bitmapText(this.width / 2, 20, Constants.FONTS.BITMAP, '05:00', 20);
    }

    private updateLives() {
        this.livesTxt.text = Constants.HUD.LIVES + this.registry.get(Constants.REGISTER.LIVES);
    }

    private updateScore() {
        this.scoreTxt.text = Phaser.Utils.String.Pad(this.registry.get(Constants.REGISTER.SCORE), 3, '0', 1);
    }

    private updateClock() {
        this.textClock.text = this.registry.get(Constants.REGISTER.CLOCK);
    }
}
