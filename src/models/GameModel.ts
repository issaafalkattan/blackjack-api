import fetch from 'node-fetch';
import { EXTERNAL_API_URL } from "../constants";
import { IDeckCard, IGame, IGameWithDeck } from "../types";
import { IPlayer } from '../types/index';
import { generateId, omitDeck } from "../utils";
import { makeFirstMove, makeNextMove } from '../utils/gameplay';

class GameModel {

  public games: { [key: string]: IGameWithDeck } = {};
  public init = async (players: [string, string]) => {
    const game: IGame = {
      createdAt: new Date(),
      id: generateId(),
      players: players.map((name) => ({ name, points: 0, cards: [] })) as [IPlayer, IPlayer],
      status: 'created',
    };
    const cardDeck = await fetch(EXTERNAL_API_URL)
      .then((res) => res.json()) as IDeckCard[];

    this.games[game.id] = { ...game, deck: cardDeck };
    return omitDeck(this.games[game.id]);
  }

  public getGame = (gameId: string) => {
    if (this.gameExists(gameId)) {
      return omitDeck(this.games[gameId]);
    }
  }

  public makeMove = (gameId: string) => {
    if (this.gameExists(gameId)) {
      const game = this.games[gameId];
      let updatedGame = { ...game };
      if (game.status === 'created') {
        // first move
        updatedGame = makeFirstMove(game);
      } else {
        // 2nd move
        updatedGame = makeNextMove(game);
      }
      this.updateGame(updatedGame);
      return omitDeck(updatedGame);
    }
  }

  public playGame = (gameId: string) => {
    if (this.gameExists(gameId)) {
      const game = this.games[gameId];
      let updatedGame = { ...game };
      if (game.status === 'created') {
        // play first move & 2nd
        updatedGame = makeFirstMove(game);
        updatedGame = makeNextMove(game);

      } else {
        // finish game
        updatedGame = makeNextMove(game);
      }
      this.updateGame(updatedGame);
      return omitDeck(updatedGame);
    }
  }

  public listGames = () => {
    return Object.values(this.games).map((game) => omitDeck(game));
  }

  private updateGame = (game: IGameWithDeck) => {
    this.games[game.id] = game;
  }

  private gameExists = (gameId: string) => {
    if (this.games[gameId]) {
      return true;
    }
    throw new Error(`Game ${gameId} does not exist`);
  }
}

export default new GameModel();
