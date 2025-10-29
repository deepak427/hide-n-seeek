import express from 'express';
import {
  CreateGameRequest,
  CreateGameResponse,
  GetGameResponse,
  GuessRequest,
  GuessResponse,
} from '../shared/types/api';
import { createServer, context } from '@devvit/web/server';
import { createPost } from './core/post';
import { saveGameState, getGameState } from './core/storage';
import { v4 as uuidv4 } from 'uuid';
import { GameState } from '../shared/types';

const app = express();

// Middleware for JSON body parsing
app.use(express.json());

const router = express.Router();

router.post('/api/create-game', async (req, res): Promise<void> => {
  const { playerId, mapKey, hiddenObjectId } = req.body as CreateGameRequest;
  if (!playerId || !mapKey || !hiddenObjectId) {
    res.status(400).json({ error: 'playerId, mapKey, and hiddenObjectId are required.' });
    return;
  }

  try {
    const gameId = uuidv4();
    const gameState: GameState = {
      gameId,
      mapKey,
      hiddenObjectId,
      creatorId: playerId,
      status: 'waiting_for_guess',
      guesses: [],
    };
    await saveGameState(gameId, gameState);

    res.json({ gameId } as CreateGameResponse);
  } catch (error) {
    console.error('Error creating game:', error);
    res.status(500).json({ error: 'Failed to create game.' });
  }
});

router.get('/api/get-game/:gameId', async (req, res): Promise<void> => {
  const { gameId } = req.params;
  if (!gameId) {
    res.status(400).json({ error: 'gameId is required.' });
    return;
  }

  try {
    const gameState = await getGameState(gameId);
    if (!gameState) {
      res.status(404).json({ error: 'Game not found.' });
      return;
    }

    res.json({
      mapKey: gameState.mapKey,
      creatorId: gameState.creatorId,
      status: gameState.status,
    } as GetGameResponse);
  } catch (error) {
    console.error('Error getting game:', error);
    res.status(500).json({ error: 'Failed to get game.' });
  }
});

router.post('/api/guess', async (req, res): Promise<void> => {
  const { gameId, playerId, objectId } = req.body as GuessRequest;
  if (!gameId || !playerId || !objectId) {
    res.status(400).json({ error: 'gameId, playerId, and objectId are required.' });
    return;
  }

  try {
    const gameState = await getGameState(gameId);
    if (!gameState) {
      res.status(404).json({ error: 'Game not found.' });
      return;
    }

    const correct = gameState.hiddenObjectId === objectId;
    const guess = { playerId, objectId, correct };
    gameState.guesses.push(guess);
    if(correct) {
      gameState.status = 'finished';
    }

    await saveGameState(gameId, gameState);

    res.json({ correct, gameState } as GuessResponse);
  } catch (error) {
    console.error('Error making guess:', error);
    res.status(500).json({ error: 'Failed to make guess.' });
  }
});


router.post('/internal/on-app-install', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      status: 'success',
      message: `Post created in subreddit ${context.subredditName} with id ${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

router.post('/internal/menu/post-create', async (_req, res): Promise<void> => {
  try {
    const post = await createPost();

    res.json({
      navigateTo: `https://reddit.com/r/${context.subredditName}/comments/${post.id}`,
    });
  } catch (error) {
    console.error(`Error creating post: ${error}`);
    res.status(400).json({
      status: 'error',
      message: 'Failed to create post',
    });
  }
});

// Use router middleware
app.use(router);

// Get port from environment variable with fallback
const port = process.env.WEBBIT_PORT || 3000;

const server = createServer(app);
server.on('error', (err) => console.error(`server error; ${err.stack}`));
server.listen(port, () => console.log(`http://localhost:${port}`));
