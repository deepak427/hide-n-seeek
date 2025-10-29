import { redis } from '@devvit/web/server';
import { GameState } from '../../shared/types';

export const saveGameState = async (gameId: string, state: GameState): Promise<void> => {
  await redis.set(gameId, JSON.stringify(state));
};

export const getGameState = async (gameId: string): Promise<GameState | null> => {
  const state = await redis.get(gameId);
  return state ? JSON.parse(state) : null;
};
