import Phaser from 'phaser';

export type HidingObject = {
  key: string;
  relX: number;
  relY: number;
  sprite: Phaser.GameObjects.Image;
  glow: Phaser.GameObjects.Image;
};

export class ObjectManager {
  private objects: HidingObject[] = [];

  constructor(
    private scene: Phaser.Scene,
    private map: Phaser.GameObjects.Image,
    private onObjectSelected: (key: string) => void
  ) {}

  add(key: string, relX: number, relY: number) {
    const { x, y, width, height } = this.map.getBounds();

    const sprite = this.scene.add.image(x + width * relX, y + height * relY, key);
    sprite.setInteractive({ pixelPerfect: true, useHandCursor: true });
    sprite.setDepth(3);

    const glow = this.scene.add
      .image(sprite.x, sprite.y, key)
      .setTintFill(0x00adb5)
      .setAlpha(0)
      .setDepth(2)
      .setScale(this.map.scale * 0.27);

    sprite.on('pointerdown', () => {
      this.onObjectSelected(key);
    });

    this.objects.push({ key, relX, relY, sprite, glow });
  }

  reposition() {
    const { x, y, width, height } = this.map.getBounds();
    this.objects.forEach((obj) => {
      const nx = x + width * obj.relX;
      const ny = y + height * obj.relY;
      obj.sprite.setPosition(nx, ny);
      obj.glow.setPosition(nx, ny);
      const s = this.map.scale * 0.25;
      obj.sprite.setScale(s);
      obj.glow.setScale(s * 1.05);
    });
  }

  getAll() {
    return this.objects;
  }

  disable() {
    this.objects.forEach((obj) => {
      obj.sprite.disableInteractive();
    });
  }
}
