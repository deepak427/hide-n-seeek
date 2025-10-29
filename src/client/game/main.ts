import { Boot } from './scenes/Boot';
import { GameOver } from './scenes/GameOver';
import { Game as MainGame } from './scenes/Game/Game';
import { MainMenu } from './scenes/MainMenu/MainMenu';
import { MapSelection } from './scenes/MapSelection/MapSelection';
import * as Phaser from 'phaser';
import { AUTO, Game } from 'phaser';
import { Preloader } from './scenes/Preloader/Preloader';
import { Theme } from '../style/theme';

//  Enhanced Game Config for Apple Arcade style responsiveness
const config: Phaser.Types.Core.GameConfig = {
  type: AUTO,
  parent: 'game-container',
  backgroundColor: Theme.bgDark,
  scale: {
    mode: Phaser.Scale.RESIZE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1024,
    height: 768,
    min: {
      width: 320,
      height: 240
    },
    max: {
      width: 2560,
      height: 1440
    }
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false
    }
  },
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
    transparent: false,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
    premultipliedAlpha: true,
    failIfMajorPerformanceCaveat: false,
    powerPreference: 'high-performance',
    batchSize: 4096,
    maxLights: 10
  },
  fps: {
    target: 60,
    forceSetTimeOut: false,
    deltaHistory: 10,
    panicMax: 120,
    smoothStep: true
  },
  scene: [Boot, Preloader, MainMenu, MapSelection, MainGame, GameOver],
  input: {
    keyboard: true,
    mouse: true,
    touch: true,
    gamepad: false
  },
  disableContextMenu: true,
  banner: {
    hidePhaser: true,
    text: '#1a1a2e',
    background: [
      '#00d4ff',
      '#0099cc',
      '#1a1a2e',
      '#16213e'
    ]
  }
};

const StartGame = (parent: string) => {
  return new Game({ ...config, parent });
};

export default StartGame;
