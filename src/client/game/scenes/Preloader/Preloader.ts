import { Scene } from 'phaser';
import { LoadingBar } from './components/LoadingBar';
import { LoadingText } from './components/LoadingText';
import { SplashAnimation } from './components/SplashAnimation';

export class Preloader extends Scene {
  private loadingBar!: LoadingBar;
  private loadingText!: LoadingText;
  private splash!: SplashAnimation;

  constructor() {
    super('Preloader');
  }

  preload() {
    this.load.image('splash', 'assets/default-splash.png');
  }

  create() {
    this.splash = new SplashAnimation(this);
    this.loadingBar = new LoadingBar(this);
    this.loadingText = new LoadingText(this);

    this.load.on('progress', (value: number) => {
      this.loadingBar.update(value);
      this.loadingText.update(value);
    });

    this.load.on('fileprogress', (file: { key: string }) => {
      this.loadingText.update(this.load.progress, file.key);
    });

    this.load.on('complete', () => {
      this.splash.play(() => {
        this.scene.start('MainMenu');
      });
    });

    this.load.image('map1', 'assets/map1.png');
    this.load.image('map2', 'assets/map2.png');
    this.load.image('map3', 'assets/map3.png');
  }
}
