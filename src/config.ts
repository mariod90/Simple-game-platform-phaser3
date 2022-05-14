import Level1 from './scenes/level1';
import Load from './scenes/load';
import Menu from './scenes/menu';
import HUD from './scenes/hud';
import Settings from './scenes/settings';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Load, Menu, Level1, HUD, Settings],
    pixelArt: true,
    audio: { disableWebAudio: true },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: true
        }
    }
};

export default config;
