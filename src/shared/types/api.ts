import { GameState } from './index';

export type CreateGameRequest = {
  playerId: string;
  mapKey: string;
  hiddenObjectId: string;
};

export type CreateGameResponse = {
  gameId: string;
};

export type GetGameResponse = {
  mapKey: string;
  creatorId: string;
  status: 'waiting_for_guess' | 'finished';
};

export type GuessRequest = {
  gameId: string;
  playerId: string;
  objectId: string;
};

export type GuessResponse = {
  correct: boolean;
  gameState: GameState;
};
