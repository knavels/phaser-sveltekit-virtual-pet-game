import { stat, uiBlocked, type Stat, selected } from '$lib/stores';

let sceneRef: GameScene;

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

        sceneRef = this;

        // background
        let bg = this.add.sprite(0, 0, 'backyard').setOrigin(0, 0).setInteractive();

        // event listener for the background
        bg.on('pointerdown', this.placeItem, this);

        this.pet = this.add.sprite(100, 200, 'pet', 0).setInteractive();

        // animation
        this.anims.create({
            key: 'funny-faces',
            frames: this.anims.generateFrameNames('pet', { frames: [1, 2, 3] }),
            frameRate: 7,
            yoyo: true,
            repeat: 0,
        });

        // event listener for when spritesheet animation is completed
        this.pet.on('animationcomplete', () => {
            this.applyStatAndUnfreezeUI();

            this.pet.setFrame(0);
        });


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
        selected.set('rotate');
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
        selected.set(item);
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
                newItem.destroy();

                // play spritesheet animation
                this.pet.play('funny-faces');
            }
        });
    }

    private readyUI() {
        uiBlocked.set(false);
        selected.set('');
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
        sceneRef.pickItem(action, appleStat);
    } else if (action === 'candy') {
        sceneRef.pickItem(action, candyStat);
    } else if (action === 'toy') {
        sceneRef.pickItem(action, toyStat);
    } else if (action === 'rotate') {
        sceneRef.rotatePet();
    }
}