import { Scene } from 'phaser';
import { Background } from './components/Background';
import { MapLayer } from './components/MapLayer';
import { UIManager } from './components/UIManager';
import { GameState } from '../../../../shared/types';

export class Game extends Scene {
  private bg!: Background;
  private mapLayer!: MapLayer;
  private ui!: UIManager;
  private gameState?: GameState;
  private mapKey!: string;

  constructor() {
    super('Game');
  }

  init(data: { mapKey: string; gameId?: string }) {
    this.mapKey = data.mapKey;
    if (data.gameId) {
      void this.fetchGame(data.gameId);
    }
  }

  preload() {
    this.load.image(this.mapKey, `assets/${this.mapKey}.png`);
    this.load.image('pumpkin', 'assets/pumpkin.png');
    this.load.image('wardrobe', 'assets/wardrobe.png');
  }

  create() {
    this.bg = new Background(this);
    this.bg.create();

    this.mapLayer = new MapLayer(this, this.mapKey, this.handleHidingSpotSelected.bind(this));
    this.mapLayer.create();

    this.ui = new UIManager(this);
    this.ui.create(
      () => this.scene.start('MapSelection'),
      () => this.shareGame()
    );

    this.scale.on('resize', this.resizeAll, this);
  }

  resizeAll = () => {
    this.bg.resize();
    this.mapLayer.resize();
    this.ui.resize();
  };

  async fetchGame(gameId: string) {
    try {
      const response = await fetch(`/api/game/${gameId}`);
      if (!response.ok) {
        throw new Error('Game not found');
      }
      this.gameState = await response.json();
      this.mapLayer.disableHidingSpots();
    } catch (error) {
      console.error(error);
      // Handle error, e.g., show a message to the user
    }
  }

  handleHidingSpotSelected(objectId: string) {
    if (!this.gameState) {
      void this.createGame(this.mapKey, objectId);
    } else {
      void this.makeGuess(objectId);
    }
  }

  async createGame(mapKey: string, hiddenObjectId: string) {
    try {
      const response = await fetch('/api/game/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mapKey, hiddenObjectId }),
      });
      if (!response.ok) {
        throw new Error('Failed to create game');
      }
      this.gameState = await response.json();
      this.ui.showShare();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

  async makeGuess(objectId: string) {
    if (!this.gameState) {
      return;
    }
    try {
      const response = await fetch(`/api/game/${this.gameState.gameId}/guess`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objectId }),
      });
      if (!response.ok) {
        throw new Error('Failed to make guess');
      }
      this.gameState = await response.json();
      if (this.gameState) {
        const lastGuess = this.gameState.guesses[this.gameState.guesses.length - 1];
        if (lastGuess) {
          this.ui.showGuessResult(lastGuess.correct);
        }
      }
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

  shareGame() {
    if (!this.gameState) {
      return;
    }
    const url = `${window.location.origin}?gameId=${this.gameState.gameId}`;
    void navigator.clipboard.writeText(url);
    const text = this.add.text(this.scale.width / 2, this.scale.height - 120, 'Link copied to clipboard!', {
      fontSize: '24px',
      color: '#fff',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: { x: 20, y: 10 },
    }).setOrigin(0.5);
    this.time.delayedCall(2000, () => text.destroy());
  }
}
