import { Router } from 'express';
import joiValidation from 'express-joi-validation';
import gameModel from '../../models/GameModel';
import { newGameSchema } from './schemas';

const validator = joiValidation.createValidator({});

const router = Router();

// List all games
router.get('/games', async (req, res, next) => {
  try {
    return res.json(gameModel.listGames());
  } catch (err) {
    next(err);
  }
});

// Create game
router.post('/games', validator.body(newGameSchema), async (req, res, next) => {
  try {
    const { players } = req.body.data;
    const game = await gameModel.init(players);
    return res.json(game);
  } catch (err) {
    next(err);
  }
});

// Get game details
router.get('/games/:gameId', async (req, res, next) => {
  try {
    const gameId = req.params.gameId;
    const result = await gameModel.getGame(gameId);
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

// Make a move
router.get('/games/:gameId/move', async (req, res, next) => {
  try {
    const gameId = req.params.gameId;
    const result = await gameModel.makeMove(gameId);
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

// Play game
router.get('/games/:gameId/play', async (req, res, next) => {
  try {
    const gameId = req.params.gameId;
    const result = await gameModel.playGame(gameId);
    return res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
