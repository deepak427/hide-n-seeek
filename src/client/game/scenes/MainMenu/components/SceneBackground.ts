import { GameObjects, Scene } from 'phaser';
import { BackgroundConfig } from '../../../../types/ui';
import { Theme } from '../../../../style/theme';

export class SceneBackground {
  public bg: GameObjects.Rectangle;
  public overlay: GameObjects.Rectangle;

  constructor({ scene, width, height }: BackgroundConfig) {
    this.bg = scene.add.rectangle(0, 0, width, height, Theme.bgDark).setOrigin(0, 0);
    this.overlay = scene.add
      .rectangle(0, 0, width, height, Theme.bgLight, 0.4)
      .setOrigin(0, 0);
  }

  resize(width: number, height: number) {
    this.bg.setSize(width, height);
    this.overlay.setSize(width, height);
  }
}
