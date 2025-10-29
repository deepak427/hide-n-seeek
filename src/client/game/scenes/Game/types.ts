// src/scenes/Game/types.ts

import Phaser from 'phaser';

/**
 * Represents any object placed on the map (like a pumpkin, wardrobe, etc.)
 */
export interface HidingObject {
  key: string; // texture key name
  relX: number; // relative horizontal position (0–1)
  relY: number; // relative vertical position (0–1)
  sprite: Phaser.GameObjects.Image;
  glow: Phaser.GameObjects.Image;
}

/**
 * A base interface for components that need lifecycle hooks
 * (helps when calling .create() and .resize() in main Game.ts)
 */
export interface SceneComponent {
  create(...args: any[]): void;
  resize?(): void;
  destroy?(): void;
}

/**
 * Parameters passed when starting the Game scene
 */
export interface GameInitData {
  mapKey: string;
}

/**
 * Shared UI callback types
 */
export interface UIHandlers {
  onBack: () => void;
  onShare: () => void;
}
