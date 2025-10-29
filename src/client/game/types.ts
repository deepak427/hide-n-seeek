export interface SceneComponent {
  create(...args: unknown[]): void;
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
