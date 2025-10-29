import { Scene } from 'phaser';

export interface ButtonConfig {
  scene: Scene;
  x: number;
  y: number;
  width?: number;
  height?: number;
  text: string;
  onClick: () => void;
}

export interface TitleConfig {
  scene: Scene;
  x: number;
  y: number;
  text: string;
  size?: number;
}

export interface BackgroundConfig {
  scene: Scene;
  width: number;
  height: number;
  color?: number;
  alpha?: number;
}
