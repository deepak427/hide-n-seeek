import { Scene } from 'phaser';

export class Preloader extends Scene {
  constructor() {
    super('Preloader');
  }

  init() {
    // Optional background + loading bar
    this.add.image(512, 384, 'background');
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);
    this.load.on('progress', (progress: number) => {
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    // Load your sprite sheet (update filename/path accordingly)
  }

  create() {
    // Create sprite at center
    const logo = this.add.sprite(512, 384, 'logo');

    // Define animation from sprite sheet
    this.anims.create({
      key: 'hide_anim',
      frames: this.anims.generateFrameNumbers('logo', { start: 0, end: 38 }), // 39 frames (0–38)
      frameRate: 12, // Adjust speed to your liking
      repeat: -1, // Loop forever
    });

    logo.play('hide_anim');

    // Optional delay before moving to main menu
    this.time.delayedCall(20000, () => {
      this.scene.start('MainMenu');
    });
  }
}
