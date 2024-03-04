import { stat, uiBlocked, type Stat, selected } from '$lib/stores';
import { get } from 'svelte/store';

let scene: GameScene;

const appleStat: Stat = {
    health: 20,
    fun: 0,
};

const candyStat: Stat = {
    health: -10,
    fun: 10,
};

const toyStat: Stat = {
    health: 0,
    fun: 15,
};

const emptyStat: Stat = {
    health: 0,
    fun: 0,
};

export default class GameScene extends Phaser.Scene {
    private pet!: Phaser.GameObjects.Sprite;
    private selectedItem: string = '';
    private currentStat: Stat = emptyStat;

    constructor() {
        super('main');
    }

    create() {
        selected.subscribe(item => this.selectedItem = item);

        scene = this;

        // background
        let bg = this.add.sprite(0, 0, 'backyard').setOrigin(0, 0).setInteractive();

        // event listener for the background
        bg.on('pointerdown', this.placeItem, this);

        this.pet = this.add.sprite(100, 200, 'pet', 0).setInteractive();

        // make pet draggable
        this.input.setDraggable(this.pet);

        // follow the pointer (mouse/finger) when dragging
        this.input.on('drag', function (_pointer: any, gameObject: Phaser.GameObjects.Sprite, dragX: number, dragY: number) {
            // make sprite be located at the cordinates of the dragging
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
    }

    public rotatePet() {
        selected.selectRotate();
        uiBlocked.set(true);

        setTimeout(() => {
            this.readyUI();
        }, 2000);

    }

    public pickItem(item: string, stat: Stat) {
        this.currentStat = stat;
        selected.selectItem(item);
    }

    private placeItem(_pointer: any, localX: number, localY: number) {
        if (this.selectedItem === '') return;

        if (localY > 480) return;

        // create a new item in the position player clicked
        let newItem = this.add.sprite(localX, localY, this.selectedItem);

        stat.apply(this.currentStat);

        // clear the ui
        this.readyUI();
    }

    private readyUI() {
        uiBlocked.set(false);
        selected.reset();
        this.currentStat = emptyStat;
    }
}


export function handleInGameActions(action: string) {
    if (action === 'apple') {
        scene.pickItem(action, appleStat);
    } else if (action === 'candy') {
        scene.pickItem(action, candyStat);
    } else if (action === 'toy') {
        scene.pickItem(action, toyStat);
    } else if (action === 'rotate') {
        scene.rotatePet();
    }
}