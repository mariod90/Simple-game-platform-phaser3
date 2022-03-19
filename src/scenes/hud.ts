import Constants from '../constants';

export default class HUD extends Phaser.Scene {
    private livesTxt: Phaser.GameObjects.Text;
    private scoreTxt: Phaser.GameObjects.Text;
    private textClock: Phaser.GameObjects.Text;
    private width: number;
    private height: number;

    constructor() {
        super(Constants.SCENES.HUD);
    }

    init() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;
    }

    create() {
        const level1: Phaser.Scene = this.scene.get(Constants.SCENES.LEVEL1);
        level1.events.on(Constants.EVENTS.LIVES, this.updateLives, this);
        level1.events.on(Constants.EVENTS.SCORE, this.updateScore, this);
        level1.events.on(Constants.EVENTS.CLOCK, this.updateClock, this);

        this.livesTxt = this.add.text(20, 20, Constants.HUD.LIVES + this.registry.get(Constants.REGISTER.LIVES), {
            fontSize: '32px',
            color: '#FFFFFF'
        });

        this.scoreTxt = this.add.text(this.width - 50, 20, '000', {
            fontSize: '20px',
            color: '#FFFFFF'
        });

        this.textClock = this.add.text(this.width / 2, 20, '05:00', {
            fontSize: '20px',
            color: '#FFFFFF'
        });
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
