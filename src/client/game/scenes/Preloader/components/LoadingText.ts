import Phaser, { Scene } from 'phaser';

export class LoadingText {
  private text: Phaser.GameObjects.Text;
  private progressText: Phaser.GameObjects.Text;

  constructor(scene: Scene) {
    const { width, height } = scene.scale;

    this.text = scene.add.text(width / 2, height * 0.7, 'LOADING...', {
      fontFamily: 'Arial Black',
      fontSize: '32px',
      color: '#ffffff',
      stroke: '#00d4ff',
      strokeThickness: 2,
    }).setOrigin(0.5);

    this.progressText = scene.add.text(width / 2, height * 0.8, '0%', {
      fontFamily: 'Arial',
      fontSize: '24px',
      color: '#e0e6ed',
    }).setOrigin(0.5);
  }

  update(progress: number, fileKey?: string): void {
    this.text.setText(fileKey ? `LOADING ${fileKey.toUpperCase()}...` : 'LOADING...');
    this.progressText.setText(`${Math.round(progress * 100)}%`);
  }

  setVisible(visible: boolean): void {
    this.text.setVisible(visible);
    this.progressText.setVisible(visible);
  }
}
