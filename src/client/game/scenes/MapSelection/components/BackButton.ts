import { GameObjects } from 'phaser';
import { Theme } from '../../../../style/theme';
import { ButtonConfig } from '../../../../types/ui';

export class BackButton extends GameObjects.Container {
  constructor(config: ButtonConfig) {
    super(config.scene, config.x, config.y);

    const bg = config.scene.add.rectangle(0, 0, 120, 50, Theme.bgLight)
      .setStrokeStyle(2, Theme.text, 0.6);
    const label = config.scene.add.text(0, 0, config.text, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
    }).setOrigin(0.5);

    this.add([bg, label]);
    this.setSize(120, 50);
    this.setInteractive({ useHandCursor: true });

    this.on('pointerover', () => bg.setFillStyle(Theme.accent));
    this.on('pointerout', () => bg.setFillStyle(Theme.bgLight));
    this.on('pointerdown', () => config.onClick());

    config.scene.add.existing(this);
  }
}
