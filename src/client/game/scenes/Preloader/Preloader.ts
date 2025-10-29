import { Scene } from 'phaser';
import { Theme } from '../../../style/theme';
import { LoadingBar } from './components/LoadingBar';
import { LoadingText } from './components/LoadingText';
import { SplashAnimation } from './components/SplashAnimation';

export class Preloader extends Scene {
  private loadingBar!: LoadingBar;
  private loadingText!: LoadingText;

  constructor() {
    super('Preloader');
  }

  create() {
    const { width, height } = this.scale;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, Theme.bgDark);
    this.add.rectangle(width / 2, height / 2, width, height, Theme.bgLight, 0.5);

    // Components
    this.loadingBar = new LoadingBar(this);
    this.loadingText = new LoadingText(this);

    // Handle progress
    this.load.on('progress', (p: number) => this.loadingBar.update(p));
    this.load.on('fileprogress', (f: any) => this.loadingText.update(this.load.progress, f.key));

    // On complete → transition
    this.load.once('complete', () => {
      this.loadingBar.setVisible(false);
      this.loadingText.setVisible(false);
      new SplashAnimation(this);
      this.time.delayedCall(3000, () => this.scene.start('MainMenu'));
    });

    // Simulate load
    this.load.image('map1', 'assets/maps/map1.png');
    this.load.spritesheet('splash', 'assets/splash.png', { frameWidth: 256, frameHeight: 256 });
    this.load.start();
  }
}
