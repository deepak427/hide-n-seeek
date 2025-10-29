import { Scene } from 'phaser';
import { Theme } from '../../../../style/theme';
import { LoadingBarOptions } from '../../../types';

export class LoadingBar {
  private bar: Phaser.GameObjects.Rectangle;
  private bg: Phaser.GameObjects.Rectangle;
  private glow: Phaser.GameObjects.Rectangle;

  constructor(private scene: Scene, opts: LoadingBarOptions = {}) {
    const { width = 400, height = 20, x = scene.scale.width / 2, y = scene.scale.height * 0.75 } = opts;

    this.bg = scene.add
      .rectangle(x, y, width, height, Theme.bgLight)
      .setStrokeStyle(2, Theme.text, 0.4);

    this.bar = scene.add.rectangle(x - width / 2 + 2, y, 4, height - 4, Theme.accent).setOrigin(0, 0.5);

    this.glow = scene.add.rectangle(x - width / 2 + 2, y, 4, height, Theme.accent, 0.3).setOrigin(0, 0.5);
  }

  update(progress: number): void {
    const fullWidth = this.bg.width - 8;
    const barWidth = Math.max(4, fullWidth * progress);
    this.bar.width = barWidth;
    this.glow.width = barWidth;
  }

  setVisible(visible: boolean): void {
    this.bar.setVisible(visible);
    this.bg.setVisible(visible);
    this.glow.setVisible(visible);
  }
}
