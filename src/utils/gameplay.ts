import { POINTS_MAPPING } from '../constants';
import { IGameWithDeck } from '../types';
import { IDeckCard, IPlayer } from '../types/index';

export const switchPlayer = (player: 0 | 1) => player === 0 ? 1 : 0;

export const getCardPoints = (card: IDeckCard) => {
  if (Number(card.value)) {
    return Number(card.value);
  }
  return POINTS_MAPPING[card.value];
};

export const getCardSymbol = (card: IDeckCard) => {
  return `${card.suit[0]}${card.value}`;
};

export const calculatePoints = (cards: IDeckCard[]): [IPlayer['points'], IPlayer['cards']] => {
  const cardsHistory = [];
  const points = cards.reduce((total, currentCard) => {
    total += getCardPoints(currentCard);
    cardsHistory.push(getCardSymbol(currentCard));
    return total;
  }, 0);
  return [points, cardsHistory];
};

export const markGameWon = (game: IGameWithDeck, winner: 0 | 1) => {
  const updatedGame = { ...game };
  updatedGame.status = 'won';
  updatedGame.winner = updatedGame.players[winner].name;
  return updatedGame;
};

export const makeFirstMove = (game: IGameWithDeck) => {
  let updatedGame = { ...game };
  const firstPlayerCards = [updatedGame.deck.pop(), updatedGame.deck.pop()];
  const secondPlayerCards = [updatedGame.deck.pop(), updatedGame.deck.pop()];

  const [firstPlayerPoints, firstPlayerHistory] = calculatePoints(firstPlayerCards);
  const [secondPlayerPoints, secondPlayerHistory] = calculatePoints(secondPlayerCards);

  if (firstPlayerPoints === 21) {
    updatedGame = markGameWon(updatedGame, 0);
  } else if (secondPlayerPoints === 21) {
    updatedGame = markGameWon(updatedGame, 1);
  } else {
    updatedGame.players = [
      {
        ...updatedGame.players[0],
        cards: firstPlayerHistory,
        points: firstPlayerPoints,
      },
      {
        ...updatedGame.players[1],
        cards: secondPlayerHistory,
        points: secondPlayerPoints,
      },
    ];
    updatedGame.status = 'ongoing';
  }

  return updatedGame;
};

export const makeSingleMove = (game: IGameWithDeck, player: 0 | 1) => {
  console.log("Game so far", game.players, game.deck.length);
  const updatedGame = { ...game };
  console.log("player", player);
  const card = updatedGame.deck.pop();
  console.log("player got", card);
  const cardPoints = getCardPoints(card);
  const cardSymbol = getCardSymbol(card);

  updatedGame.players[player] = {
    ...updatedGame.players[player],
    cards: [...updatedGame.players[player].cards, cardSymbol],
    points: updatedGame.players[player].points + cardPoints,
  };

  return updatedGame;
};

export const playUntilMax = (game: IGameWithDeck, player: 0 | 1, otherPlayerScore?: number) => {
  let updatedGame = { ...game };

  while (updatedGame.players[player].points <= 17) {
    updatedGame = makeSingleMove(updatedGame, player);
  }

  if (updatedGame.players[player].points > 21) {
    return markGameWon(game, switchPlayer(player));
  } else if (otherPlayerScore && updatedGame.players[player].points > otherPlayerScore) {
    return markGameWon(game, player);
   } else {
    return playUntilMax(updatedGame, switchPlayer(player), updatedGame.players[player].points);
  }
};

export const makeNextMove = (game: IGameWithDeck) => {
  const updatedGame = { ...game };
  return playUntilMax(updatedGame, 0);
};
