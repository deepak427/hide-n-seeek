import { GameObjects, Scene } from 'phaser';
import { TitleConfig } from '../../../../types/ui';
import { Theme } from '../../../../style/theme';

export class TitleText extends GameObjects.Text {
  constructor({ scene, x, y, text, size = 64 }: TitleConfig) {
    super(scene, x, y, text, {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: `${size}px`,
      color: '#ffffff',
      stroke: '#00d4ff',
      strokeThickness: 4,
      shadow: {
        offsetX: 0,
        offsetY: 4,
        color: '#000000',
        blur: 8,
        fill: true,
      },
      align: 'center',
    });

    this.setOrigin(0.5);
    this.setTint(Theme.text);
    scene.add.existing(this);
  }
}
