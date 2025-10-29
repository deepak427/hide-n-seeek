import { ObjectManager } from './ObjectManager';

export class MapLayer {
  private map!: Phaser.GameObjects.Image;
  private objectManager!: ObjectManager;

  constructor(private scene: Phaser.Scene, private mapKey: string) {}

  create() {
    const { width, height } = this.scene.scale;

    this.map = this.scene.add.image(width / 2, height / 2, this.mapKey).setOrigin(0.5);
    const scale = Math.min((width * 0.9) / this.map.width, (height * 0.8) / this.map.height);
    this.map.setScale(scale);

    this.objectManager = new ObjectManager(this.scene, this.map);
    this.objectManager.add('pumpkin', 0.75, 0.85);
    this.objectManager.add('wardrobe', 0.25, 0.82);
  }

  resize() {
    const { width, height } = this.scene.scale;
    this.map.setPosition(width / 2, height / 2);
    const scale = Math.min((width * 0.9) / this.map.width, (height * 0.8) / this.map.height);
    this.map.setScale(scale);
    this.objectManager.reposition();
  }

  getMap() {
    return this.map;
  }

  getObjects() {
    return this.objectManager.getAll();
  }
}
