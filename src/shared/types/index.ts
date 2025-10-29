export interface GameState {
  gameId: string;
  mapKey: string;
  hiddenObjectId: string;
  creatorId: string;
  status: 'waiting_for_guess' | 'finished';
  guesses: Guess[];
}

export interface Guess {
  playerId: string;
  objectId: string;
  correct: boolean;
}
