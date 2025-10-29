import { Scene } from 'phaser';
import { SceneBackground } from './components/SceneBackground';
import { MapCard } from './components/MapCard';
import { BackButton } from './components/BackButton';
import { Theme } from '../../../style/theme';

export class MapSelection extends Scene {
  private background!: SceneBackground;
  private maps = [
    { key: 'map1', title: 'Mansion' },
    { key: 'map2', title: 'Playground' },
    { key: 'map3', title: 'Factory' },
  ];

  constructor() {
    super('MapSelection');
  }

  preload(): void {
    this.maps.forEach((m) => this.load.image(m.key, `assets/${m.key}.png`));
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

    // 🗺️ Title
    this.add.text(width / 2, height * 0.15, 'SELECT A MAP', {
      fontFamily: 'Arial Black, sans-serif',
      fontSize: '48px',
      color: '#ffffff',
      stroke: '#00adb5',
      strokeThickness: 4,
    }).setOrigin(0.5);

    // 🃏 Map Cards (centered grid)
    const spacing = 360;
    const startX = width / 2 - ((this.maps.length - 1) * spacing) / 2;

    this.maps.forEach((map, index) => {
      new MapCard(
        this,
        startX + index * spacing,
        height * 0.55,
        map.key,
        map.title,
        () => this.scene.start('Game', { mapKey: map.key })
      );
    });

    // 🔙 Back Button
    new BackButton({
      scene: this,
      x: 100,
      y: 50,
      text: 'BACK',
      onClick: () => this.scene.start('MainMenu'),
    });

    // 📏 Handle resize
    this.scale.on('resize', this.resize, this);
  }

  private resize(gameSize: Phaser.Structs.Size): void {
    const { width, height } = gameSize;
    this.background.resize(width, height);
  }
}
