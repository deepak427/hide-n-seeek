import Phaser, { Scene } from 'phaser';
import { SceneBackground } from './components/SceneBackground';
import { MenuButton } from './components/MenuButton';
import { TitleText } from './components/TitleText';
import { Theme } from '../../../style/theme';

export class MainMenu extends Scene {
  private background!: SceneBackground;

  constructor() {
    super('MainMenu');
  }

  create(): void {
    const { width, height } = this.scale;

    // 🎨 Background
    this.background = new SceneBackground({
      scene: this,
      width,
      height,
      color: Theme.bgDark,
    });

    // 🏷️ Title
    new TitleText({
      scene: this,
      x: width / 2,
      y: height * 0.25,
      text: 'HIDE & SEEK',
      size: 72,
    });

    // 🕹️ Play Button
    new MenuButton({
      scene: this,
      x: width / 2,
      y: height * 0.55,
      text: 'PLAY',
      onClick: () => this.scene.start('MapSelection'),
    });

    // ⚙️ Settings Button (optional)
    new MenuButton({
      scene: this,
      x: width / 2,
      y: height * 0.7,
      text: 'SETTINGS',
      onClick: () => console.log('Open settings...'),
    });

    // 📏 Handle resize
    this.scale.on('resize', this.resize, this);
  }

  private resize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.background.resize(width, height);
  }
}
