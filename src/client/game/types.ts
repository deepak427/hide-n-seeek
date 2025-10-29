import Phaser from 'phaser';

export interface SceneComponent {
  create(...args: any[]): void;
  resize?(): void;
  destroy?(): void;
}

export interface LoadingBarOptions {
  width?: number;
  height?: number;
  x?: number;
  y?: number;
}

export interface GameInitData {
  mapKey: string;
}
