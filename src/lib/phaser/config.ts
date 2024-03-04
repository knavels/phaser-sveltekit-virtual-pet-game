import Phaser from 'phaser';

import LoadingSplash from './scenes/Splash';
import PreloaderScene from './scenes/PreloaderScene';
import GameScene from './scenes/GameScene';
import HomeScene from './scenes/HomeScene';

export const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: 360,
    height: 640,
    title: 'Virtual Pet',
    pixelArt: false,

    scene: [LoadingSplash, PreloaderScene, GameScene, HomeScene]
};
