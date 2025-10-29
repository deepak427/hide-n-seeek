import { Scene, GameObjects } from 'phaser';

export class Game extends Scene {
  private mapKey: string;
  private hiddenObjectId: string;
  private shareButton: GameObjects.Text;
  private isGuessing: boolean;
  private gameId: string;

  constructor() {
    super('Game');
  }

  init(data: { mapKey: string, gameId?: string, isGuessing?: boolean }) {
    this.mapKey = data.mapKey;
    this.isGuessing = data.isGuessing || false;
    if (this.isGuessing) {
        if (!data.gameId) {
            throw new Error("gameId is required for guessing mode");
        }
        this.gameId = data.gameId;
    }
  }

  create() {
    const { width, height } = this.scale;

    // Display the map
    this.add.image(width / 2, height / 2, this.mapKey);

    // TODO: Replace with actual interactive objects
    const tree = this.add.rectangle(100, 100, 50, 50, 0x00ff00).setInteractive({ useHandCursor: true });
    tree.name = 'tree_01';
    const box = this.add.rectangle(200, 200, 50, 50, 0x0000ff).setInteractive({ useHandCursor: true });
    box.name = 'box_01';

    const objects = [tree, box];

    if (this.isGuessing) {
        objects.forEach(obj => {
            obj.on('pointerdown', async () => {
                try {
                    const response = await fetch('/api/guess', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            gameId: this.gameId,
                            playerId: 'guesser789', // TODO: Replace with actual player ID
                            objectId: obj.name,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error('Failed to make a guess.');
                    }

                    const { correct } = await response.json();
                    if (correct) {
                        this.scene.start('GameOver', { success: true });
                    } else {
                       obj.setAlpha(0.5); // Indicate wrong guess
                    }
                } catch (error) {
                    console.error('Error guessing:', error);
                }
            });
        });
    } else {
        objects.forEach(obj => {
            obj.on('pointerdown', () => {
                // Reset tint of previous selection
                objects.forEach(o => o.setStrokeStyle());
                this.hiddenObjectId = obj.name;
                // Highlight selection
                obj.setStrokeStyle(4, 0xffff00);
                this.shareButton.setVisible(true);
            });
        });

        // Add a share button
        this.shareButton = this.add
          .text(width / 2, height - 50, 'Share', {
            fontFamily: 'Arial Black',
            fontSize: '38px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 8,
            align: 'center',
          })
          .setOrigin(0.5)
          .setInteractive({ useHandCursor: true })
          .setVisible(false);

        this.shareButton.on('pointerdown', async () => {
          this.shareButton.setText('Sharing...').disableInteractive();
            try {
              const response = await fetch('/api/create-game', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  playerId: 'user123', // TODO: Replace with actual player ID
                  mapKey: this.mapKey,
                  hiddenObjectId: this.hiddenObjectId,
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to create game.');
              }

              const { gameId } = await response.json();
              // In a real app, you'd use a proper URL builder and likely show a modal
              const postUrl = `${window.location.origin}?gameId=${gameId}`;
              this.shareButton.setText('Shared!');
              // You might want to show the URL in a dialog instead of opening a new tab
              prompt("Share this URL with your friends!", postUrl);

            } catch (error) {
              console.error('Error sharing post:', error);
              this.shareButton.setText('Error!').setInteractive();
            }
        });
    }
  }
}
