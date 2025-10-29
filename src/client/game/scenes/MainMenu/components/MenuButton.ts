import { GameObjects } from 'phaser';
import { Theme } from '../../../../style/theme';
import { ButtonConfig } from '../../../../types/ui';

export class MenuButton extends GameObjects.Container {
  private bg: GameObjects.Rectangle;
  private label: GameObjects.Text;

  constructor(config: ButtonConfig) {
    super(config.scene, config.x, config.y);

    const width = config.width ?? 200;
    const height = config.height ?? 60;

    this.bg = config.scene.add
      .rectangle(0, 0, width, height, Theme.accent)
      .setStrokeStyle(3, Theme.text, 0.8);
    this.label = config.scene.add
      .text(0, 0, config.text, {
        fontFamily: 'Arial Black, sans-serif',
        fontSize: '32px',
        color: '#ffffff',
        stroke: '#000000',
        strokeThickness: 2,
        align: 'center',
      })
      .setOrigin(0.5);

    this.add([this.bg, this.label]);
    this.setSize(width, height);
    this.setInteractive({ useHandCursor: true });

    this.on('pointerover', () => {
      this.bg.setFillStyle(Theme.accent);
      config.scene.tweens.add({ targets: this, scale: 1.05, duration: 150 });
    });

    this.on('pointerout', () => {
      config.scene.tweens.add({ targets: this, scale: 1, duration: 150 });
    });

    this.on('pointerdown', () => {
      config.scene.tweens.add({
        targets: this,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 100,
        yoyo: true,
        ease: 'Power2',
        onComplete: config.onClick,
      });
    });

    config.scene.add.existing(this);
  }
}
