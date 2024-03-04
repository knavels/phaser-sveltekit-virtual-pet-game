export default class PreloaderScene extends Phaser.Scene {
    constructor() {
        super('preloader');
    }

    preload() {
        // add stuff to load here 👇
        const loaders: (() => void)[] = [
            () => {
                this.load.image('backyard', 'assets/images/backyard.png');

                // tools
                this.load.image('apple', 'assets/images/apple.png');
                this.load.image('candy', 'assets/images/candy.png');
                this.load.image('rotate', 'assets/images/rotate.png');
                this.load.image('toy', 'assets/images/rubber_duck.png');

                // load spritesheet
                this.load.spritesheet('pet', 'assets/images/pet.png', {
                    frameWidth: 97,
                    frameHeight: 83,
                    margin: 1,
                    spacing: 1
                });
            }
        ];

        this.loadAndSendUpdates(loaders);
    }

    private loadAndSendUpdates(preloadList: (() => void)[]) {
        const totalToLoad = preloadList.length;
        let loadedCount = 0;

        // Listen for the 'filecomplete' event and update the progress
        this.load.on('filecomplete', () => {
            loadedCount++;
            const percentageComplete = loadedCount / totalToLoad;
            this.scene.get('splash').events.emit('set_loader_progress', percentageComplete);
        });

        // Trigger the load process
        preloadList.forEach((load) => load());
    }

    create() {
        // animation
        this.anims.create({
            key: 'funny-faces',
            frames: this.anims.generateFrameNames('pet', { frames: [1, 2, 3] }),
            frameRate: 7,
            yoyo: true,
            repeat: 0,
        });

        this.scene.get('splash').events.emit('set_loader_progress', 1);
        this.time.delayedCall(50, () => {
            this.scene.stop('splash');
            this.scene.start('home');
        });
    }
}
