import { Scene } from 'phaser';
import { Background } from './components/Background';
import { MapLayer } from './components/MapLayer';
import { UIManager } from './components/UIManager';

export class Game extends Scene {
  private bg!: Background;
  private mapLayer!: MapLayer;
  private ui!: UIManager;

  constructor() {
    super('Game');
  }

  init(data: { mapKey: string }) {
    this.mapLayer = new MapLayer(this, data.mapKey);
  }

  preload() {
    this.load.image(this.mapLayer['mapKey'], `assets/${this.mapLayer['mapKey']}.png`);
    this.load.image('pumpkin', 'assets/pumpkin.png');
    this.load.image('wardrobe', 'assets/wardrobe.png');
  }

  create() {
    this.bg = new Background(this);
    this.bg.create();

    this.mapLayer.create();

    this.ui = new UIManager(this);
    this.ui.create(
      () => this.scene.start('MapSelection'),
      () => console.log('Sharing...')
    );

    this.scale.on('resize', this.resizeAll, this);
  }

  resizeAll = () => {
    this.bg.resize();
    this.mapLayer.resize();
    this.ui.resize();
  };
}
