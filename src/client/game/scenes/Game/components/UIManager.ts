import Phaser from 'phaser';
import { Theme } from '../../../../style/theme';

export class UIManager {
  private backBtn!: Phaser.GameObjects.Container;
  private shareBtn!: Phaser.GameObjects.Text;
  private guessResultText!: Phaser.GameObjects.Text;

  constructor(private scene: Phaser.Scene) { }

  create(onBack: () => void, onShare: () => void) {
    const { width, height } = this.scene.scale;

    const backRect = this.scene.add.rectangle(0, 0, 100, 40, Theme.bgLight).setStrokeStyle(2, Theme.textSecondary);
    const backText = this.scene.add.text(0, 0, 'BACK', { fontSize: '18px', color: '#fff' }).setOrigin(0.5);
    this.backBtn = this.scene.add.container(width * 0.05, height * 0.05, [backRect, backText]).setSize(100, 40).setInteractive();

    this.backBtn.on('pointerdown', onBack);
    this.backBtn.on('pointerover', () => backRect.setFillStyle(Theme.accent));
    this.backBtn.on('pointerout', () => backRect.setFillStyle(Theme.bgLight));

    this.shareBtn = this.scene.add.text(width / 2, height - 60, 'SHARE HIDING SPOT', {
      fontSize: '24px',
      color: '#fff',
      backgroundColor: '#16213e',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setInteractive().setVisible(false);

    this.shareBtn.on('pointerdown', onShare);

    this.guessResultText = this.scene.add.text(width / 2, height / 2, '', {
      fontSize: '48px',
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5).setVisible(false);
  }

  resize() {
    const { width, height } = this.scene.scale;
    this.backBtn.setPosition(width * 0.05, height * 0.05);
    this.shareBtn.setPosition(width / 2, height - 60);
    this.guessResultText.setPosition(width / 2, height / 2);
  }

  showShare() {
    this.shareBtn.setVisible(true);
  }

  showGuessResult(correct: boolean) {
    this.guessResultText.setText(correct ? 'CORRECT!' : 'WRONG!');
    this.guessResultText.setVisible(true);
  }
}
