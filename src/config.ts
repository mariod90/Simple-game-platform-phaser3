import Level1 from './scenes/level1';
import Load from './scenes/load';
import Menu from './scenes/menu';
import HUD from './scenes/hud';
import Settings from './scenes/settings';
import Credits from './scenes/credits';
import Level2 from './scenes/level2';
import Level3 from './scenes/level3';
import LevelSelection from './scenes/levelSelection';
import FinalLevels from './scenes/finalLevels';

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: [Load, Menu, Level1, Level2, Level3, HUD, Settings, Credits, LevelSelection, FinalLevels],
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
