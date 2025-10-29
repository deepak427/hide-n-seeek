import { redis } from '@devvit/web/server';
import { GameState } from '../../shared/types';
import { v4 as uuidv4 } from 'uuid';

export const createGame = async (
  mapKey: string,
  hiddenObjectId: string,
  creatorId: string
): Promise<GameState> => {
  const gameId = uuidv4();
  const newGame: GameState = {
    gameId,
    mapKey,
    hiddenObjectId,
    creatorId,
    status: 'waiting_for_guess',
    guesses: [],
  };

  await redis.set(`game:${gameId}`, JSON.stringify(newGame));
  return newGame;
};

export const getGame = async (gameId: string): Promise<GameState | null> => {
  const gameData = await redis.get(`game:${gameId}`);
  if (!gameData) {
    return null;
  }
  return JSON.parse(gameData);
};

export const updateGame = async (game: GameState): Promise<GameState> => {
  await redis.set(`game:${game.gameId}`, JSON.stringify(game));
  return game;
};
