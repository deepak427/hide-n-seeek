import { Scene, GameObjects } from 'phaser';
import { Theme } from '../../../../style/theme';

export class Background {
  private bg!: GameObjects.Rectangle;
  private overlay!: GameObjects.Rectangle;

  constructor(private scene: Scene) {}

  create() {
    const { width, height } = this.scene.scale;
    this.bg = this.scene.add.rectangle(0, 0, width, height, Theme.bgDark).setOrigin(0);
    this.overlay = this.scene.add.rectangle(0, 0, width, height, Theme.bgGradient, 0.3).setOrigin(0);
  }

  resize() {
    const { width, height } = this.scene.scale;
    this.bg.setSize(width, height);
    this.overlay.setSize(width, height);
  }
}
