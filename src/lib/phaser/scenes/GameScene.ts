import { stat, uiBlocked, type Stat, selected } from '$lib/stores';
import { state } from '$stores/game';
import type { Unsubscriber } from 'svelte/store';

type GameConfigType = {
    decayRate: Stat,
    appleStat: Stat,
    candyStat: Stat,
    toyStat: Stat,
    rotateStat: Stat,
};

const gameConfig: GameConfigType = {
    decayRate: {
        health: -5,
        fun: -2
    },

    appleStat: {
        health: 20,
        fun: 0,
    },

    candyStat: {
        health: -10,
        fun: 10,
    },

    toyStat: {
        health: 0,
        fun: 15,
    },

    rotateStat: {
        health: 0,
        fun: 20,
    },
};

let sceneRef: GameScene;

export default class GameScene extends Phaser.Scene {
    private pet!: Phaser.GameObjects.Sprite;
    private selectedItem: string = '';
    private currentStat: Stat = { health: 0, fun: 0 };
    private timedEventStats!: Phaser.Time.TimerEvent;

    private isGameOver: boolean = false;

    private selectedUnsub!: Unsubscriber;
    private statUnsub!: Unsubscriber;

    constructor() {
        super('game');
    }

    create() {
        this.isGameOver = false;

        this.selectedUnsub = selected.subscribe(item => this.selectedItem = item);
        this.statUnsub = stat.subscribe(item => {
            if (item.health < 0) {
                stat.zeroTheHealth();
                this.isGameOver = true;
            }
            if (item.fun < 0) {
                stat.zeroTheFun();
                this.isGameOver = true;
            }

            // check if the game ended
            if (this.isGameOver) this.gameOver();
        })

        sceneRef = this;

        // background
        let bg = this.add.sprite(0, 0, 'backyard').setOrigin(0, 0).setInteractive();

        // event listener for the background
        bg.on('pointerdown', this.placeItem, this);

        this.pet = this.add.sprite(100, 200, 'pet', 0).setInteractive();

        // event listener for when spritesheet animation is completed
        this.pet.on('animationcomplete', () => {
            this.applyStatAndUnfreezeUI();

            this.pet.setFrame(0);
        });


        // make pet draggable
        this.input.setDraggable(this.pet);

        // follow the pointer (mouse/finger) when dragging
        this.input.on('drag', (_pointer: any, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) => {
            if (this.isGameOver) return;

            // make sprite be located at the cordinates of the dragging
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

        // decay of health and fun over time
        this.timedEventStats = this.time.addEvent({
            delay: 1000,
            repeat: -1, // forever
            callback: () => {
                stat.apply(gameConfig.decayRate);
            }
        });
    }

    public rotatePet() {
        selected.set('rotate');
        uiBlocked.set(true);

        // rotation tween
        let rotationTween = this.tweens.add({
            targets: this.pet,
            duration: 1600,
            angle: 720,
            pause: false,
            onComplete: (tween, sprites) => {
                this.applyStatAndUnfreezeUI(gameConfig.rotateStat);
            }
        });
    }

    public pickItem(item: string, stat: Stat) {
        this.currentStat = stat;
        selected.set(item);
    }

    private placeItem(_pointer: any, localX: number, localY: number) {
        if (this.selectedItem === '') return;

        if (localY > 520) return;

        // create a new item in the position player clicked
        let newItem = this.add.sprite(localX, localY, this.selectedItem);

        uiBlocked.set(true);

        let petTween = this.tweens.add({
            targets: this.pet,
            duration: 500,
            x: newItem.x,
            y: newItem.y,
            paused: false,
            onComplete: (tween, sprites) => {
                newItem.destroy();

                // play spritesheet animation
                this.pet.play('funny-faces');
            }
        });
    }

    private readyUI() {
        uiBlocked.set(false);
        selected.set('');
        this.currentStat = { health: 0, fun: 0 };
    }

    private applyStatAndUnfreezeUI(value: Stat | null = null) {
        stat.apply(value ?? this.currentStat);

        // set UI to ready
        this.readyUI();
    }

    private gameOver() {
        state.set('game-over');
        this.timedEventStats.destroy();
        uiBlocked.set(true);
        this.pet.setFrame(4);

        this.statUnsub();
        this.selectedUnsub();

        this.time.addEvent({
            delay: 2000,
            repeat: 0,
            callback: () => {
                this.scene.start('home');
            }
        })
    }
}


export function handleInGameActions(action: string) {
    if (action === 'apple') {
        sceneRef.pickItem(action, gameConfig.appleStat);
    } else if (action === 'candy') {
        sceneRef.pickItem(action, gameConfig.candyStat);
    } else if (action === 'toy') {
        sceneRef.pickItem(action, gameConfig.toyStat);
    } else if (action === 'rotate') {
        sceneRef.rotatePet();
    }
}