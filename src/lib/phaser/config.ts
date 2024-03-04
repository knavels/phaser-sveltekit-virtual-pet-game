import Phaser from 'phaser';

import LoadingSplash from './scenes/Splash';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: 360,
    height: 640,
    title: 'Virtual Pet',
    pixelArt: false,
    backgroundColor: 'ffffff',
    scale: {
        mode: Phaser.Scale.NONE
    },

    scene: [LoadingSplash, PreloaderScene, GameScene]
};
