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

  const firstPlayerCards = [updatedGame.deck.shift(), updatedGame.deck.shift()];
  const secondPlayerCards = [updatedGame.deck.shift(), updatedGame.deck.shift()];

  const [firstPlayerPoints, firstPlayerHistory] = calculatePoints(firstPlayerCards);
  const [secondPlayerPoints, secondPlayerHistory] = calculatePoints(secondPlayerCards);

  updatedGame.players = [
    { ...updatedGame.players[0], points: firstPlayerPoints, cards: firstPlayerHistory },
    { ...updatedGame.players[1], cards: secondPlayerHistory, points: secondPlayerPoints },
  ];

  if (firstPlayerPoints === 21) {
    updatedGame = markGameWon(updatedGame, 0);
  } else if (secondPlayerPoints === 21) {
    updatedGame = markGameWon(updatedGame, 1);
  } else {
    updatedGame.status = 'ongoing';
  }
  return updatedGame;
};

export const makeSingleMove = (game: IGameWithDeck, player: 0 | 1) => {
  const updatedGame = { ...game };
  const card = updatedGame.deck.shift();

  const cardPoints = getCardPoints(card);
  const cardSymbol = getCardSymbol(card);

  updatedGame.players[player] = {
    ...updatedGame.players[player],
    cards: [...updatedGame.players[player].cards, cardSymbol],
    points: updatedGame.players[player].points + cardPoints,
  };

  return updatedGame;
};

export const playUntilWon = (game: IGameWithDeck, player: 0 | 1, otherPlayerScore?: number) => {
  let updatedGame = { ...game };

  while (updatedGame.players[player].points <= 16) {
    updatedGame = makeSingleMove(updatedGame, player);
  }

  if (updatedGame.players[player].points > 21) {
    return markGameWon(game, switchPlayer(player));
  } else if (otherPlayerScore && updatedGame.players[player].points > otherPlayerScore) {
    return markGameWon(game, player);
  } else {
    return playUntilWon(updatedGame, switchPlayer(player), updatedGame.players[player].points);
  }
};

export const makeNextMove = (game: IGameWithDeck) => {
  const updatedGame = { ...game };
  return playUntilWon(updatedGame, 0);
};
