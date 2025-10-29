import Phaser, { Scene } from 'phaser';

export class SplashAnimation {
  private logo: Phaser.GameObjects.Image;
  private title: Phaser.GameObjects.Text;

  constructor(private scene: Scene) {
    const { width, height } = scene.scale;

    this.logo = scene.add.image(width / 2, height / 2 - 50, 'splash').setScale(1.5);
    this.title = scene.add.text(width / 2, height / 2 + 80, 'HNS', {
      fontFamily: 'Arial Black',
      fontSize: '64px',
      color: '#ffffff',
      stroke: '#00adb5',
      strokeThickness: 8,
    }).setOrigin(0.5);
  }

  play(onComplete: () => void): void {
    const { scene } = this;
    scene.tweens.add({
      targets: this.logo,
      angle: 360,
      scale: 1,
      duration: 1000,
      ease: 'Power2',
    });
    scene.tweens.add({
      targets: this.title,
      alpha: { from: 0, to: 1 },
      y: '+=20',
      duration: 500,
      ease: 'Power2',
      delay: 200,
      onComplete,
    });
  }

  setVisible(visible: boolean): void {
    this.logo.setVisible(visible);
    this.title.setVisible(visible);
  }
}
