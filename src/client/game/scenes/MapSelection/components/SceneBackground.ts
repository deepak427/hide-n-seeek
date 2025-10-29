import Phaser from 'phaser';
import { Theme } from '../../../../style/theme';

interface SceneBackgroundConfig {
  scene: Phaser.Scene;
  width: number;
  height: number;
  color?: number;
}

/**
 * A reusable full-screen colored background that auto-resizes with the scene.
 * Uses Theme colors and smooth transition when color changes.
 */
export class SceneBackground {
  private scene: Phaser.Scene;
  private rect: Phaser.GameObjects.Rectangle;
  private color: number;

  constructor({ scene, width, height, color = Theme.bgDark }: SceneBackgroundConfig) {
    this.scene = scene;
    this.color = color;

    this.rect = scene.add
      .rectangle(width / 2, height / 2, width, height, color)
      .setOrigin(0.5)
      .setDepth(-10); // keep background behind everything

    // Optional fade-in effect
    scene.tweens.add({
      targets: this.rect,
      alpha: { from: 0, to: 1 },
      duration: 600,
      ease: 'Power2',
    });
  }

  /**
   * Resize background on window or orientation change
   */
  resize(width: number, height: number): void {
    this.rect.setSize(width, height);
    this.rect.setPosition(width / 2, height / 2);
  }

  /**
   * Smoothly change background color (optional)
   */
  setColor(newColor: number): void {
    this.scene.tweens.addCounter({
      from: this.color,
      to: newColor,
      duration: 400,
      onUpdate: (tween) => {
        const value = Phaser.Display.Color.Interpolate.ColorWithColor(
          Phaser.Display.Color.ValueToColor(this.color),
          Phaser.Display.Color.ValueToColor(newColor),
          100,
          tween.progress * 100
        );
        const color = Phaser.Display.Color.GetColor(value.r, value.g, value.b);
        this.rect.fillColor = color;
      },
      onComplete: () => (this.color = newColor),
    });
  }
}
