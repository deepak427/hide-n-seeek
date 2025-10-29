import { GameObjects, Scene } from 'phaser';
import { Theme } from '../../../../style/theme';

export class MapCard extends GameObjects.Container {
  private bg: GameObjects.Rectangle;
  private preview: GameObjects.Image;
  private title: GameObjects.Text;

  constructor(scene: Scene, x: number, y: number, mapKey: string, title: string, onSelect: () => void) {
    super(scene, x, y);

    this.bg = scene.add.rectangle(0, 0, 320, 240, Theme.bgLight).setStrokeStyle(3, Theme.accent);
    this.preview = scene.add.image(0, -40, mapKey).setDisplaySize(280, 140);
    this.title = scene.add.text(0, 80, title, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add([this.bg, this.preview, this.title]);
    this.setSize(320, 240);
    this.setInteractive({ useHandCursor: true });

    this.on('pointerover', () => {
      this.bg.setStrokeStyle(3, Theme.accent);
      scene.tweens.add({ targets: this, scale: 1.05, duration: 150 });
    });
    this.on('pointerout', () => {
      scene.tweens.add({ targets: this, scale: 1, duration: 150 });
    });
    this.on('pointerdown', () => onSelect());

    scene.add.existing(this);
  }
}
