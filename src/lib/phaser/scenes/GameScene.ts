import { stat, uiBlocked, type Stat, selected } from '$lib/stores';

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

const rotateStat: Stat = {
    health: 0,
    fun: 20,
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

        // rotation tween
        let rotationTween = this.tweens.add({
            targets: this.pet,
            duration: 1600,
            angle: 720,
            pause: false,
            onComplete: (tween, sprites) => {
                this.applyStatAndUnfreezeUI(rotateStat);
            }
        });
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

        uiBlocked.set(true);

        let petTween = this.tweens.add({
            targets: this.pet,
            duration: 500,
            x: newItem.x,
            y: newItem.y,
            paused: false,
            onComplete: (tween, sprites) => {
                this.applyStatAndUnfreezeUI();
                newItem.destroy();
            }
        });
    }

    private readyUI() {
        uiBlocked.set(false);
        selected.reset();
        this.currentStat = emptyStat;
    }

    private applyStatAndUnfreezeUI(newStat: Stat | null = null) {
        stat.apply(newStat ?? this.currentStat);

        // set UI to ready
        this.readyUI();
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