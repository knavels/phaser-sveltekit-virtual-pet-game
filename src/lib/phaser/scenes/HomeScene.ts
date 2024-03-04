import { stat } from "$stores";
import { selected, state, uiBlocked } from "$stores/game";

export default class HomeScene extends Phaser.Scene {
    constructor() {
        super('home');
    }

    create() {
        state.set('home');

        // background
        let bg = this.add.sprite(0, 0, 'backyard').setOrigin(0, 0).setInteractive();

        // event listener for the background
        bg.on('pointerdown', () => {
            this.scene.start('game');
            uiBlocked.set(false);
            selected.set('');
            stat.reset();
            state.set('game');
        }, this);
    }
}
