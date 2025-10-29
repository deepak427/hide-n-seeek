export interface GameState {
  gameId: string;
  mapKey: string;
  hiddenObjectId: string;
  creatorId: string;
  status: 'waiting_for_guess' | 'finished';
  guesses: {
    playerId: string;
    objectId: string;
    correct: boolean;
  }[];
}
