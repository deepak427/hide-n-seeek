import { Scene } from 'phaser';

export class SplashAnimation {
  private logo: Phaser.GameObjects.Sprite;
  private title: Phaser.GameObjects.Text;

  constructor(private scene: Scene) {
    const { width, height } = scene.scale;

    this.logo = scene.add.sprite(width / 2, height / 2 - 50, 'splash').setScale(1.5);

    scene.anims.create({
      key: 'hide_anim',
      frames: scene.anims.generateFrameNumbers('splash', { start: 0, end: 38 }),
      frameRate: 12,
      repeat: -1,
    });

    this.logo.play('hide_anim');

    this.title = scene.add.text(width / 2, height / 2 + 100, 'HIDE & SEEK', {
      fontFamily: 'Arial Black',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#00d4ff',
      strokeThickness: 3,
      align: 'center',
    }).setOrigin(0.5).setAlpha(0);

    scene.tweens.add({
      targets: this.title,
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    });
  }
}
