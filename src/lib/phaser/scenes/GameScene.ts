import { stat, type Stat } from '$lib/stores';
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

export default class GameScene extends Phaser.Scene {
    private pet!: Phaser.GameObjects.Sprite;

    constructor() {
        super('main');
    }

    create() {
        // console.log('hello world'); // todo:: remove me
        // this.updateNumSpawns(get(logoCount));
        // logoCount.subscribe((count) => {
        //     this.updateNumSpawns(count);
        // });
        // this.matter.add.mouseSpring();

        scene = this;

        // background
        this.add.sprite(0, 0, 'backyard').setOrigin(0, 0);

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

    public movePet() {
        this.pet.x += 1;
    }

    public rotatePet() {
        alert('rotating the pet');
    }

    public pickItem(item: string) {
        alert('we are picking up something ' + item);
    }
}


export function handleInGameActions(action: string) {
    if (action === 'apple') {
        scene.pickItem(action);
    } else if (action === 'candy') {
        scene.pickItem(action);
    } else if (action === 'toy') {
        scene.pickItem(action);
    } else if (action === 'rotate') {
        scene.rotatePet();
    }
}