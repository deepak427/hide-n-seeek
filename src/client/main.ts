import StartGame from './game/main';

document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const gameId = urlParams.get('gameId');

  if (gameId) {
    try {
      const response = await fetch(`/api/get-game/${gameId}`);
      if (!response.ok) {
        throw new Error('Game not found.');
      }
      const gameData = await response.json();
      const game = StartGame('game-container');
      game.scene.start('Game', { ...gameData, gameId, isGuessing: true });

    } catch (error) {
      console.error('Error loading game:', error);
      // Handle error, e.g., show an error message to the user
    }
  } else {
    StartGame('game-container');
  }
});
