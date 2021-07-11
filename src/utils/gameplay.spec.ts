import { describe, expect, it } from '@jest/globals';
import { calculatePoints, getCardPoints, getCardSymbol, makeFirstMove, makeNextMove, makeSingleMove, markGameWon, playUntilWon, switchPlayer } from './gameplay';
import { firstPlayerExceeds21, firstPlayerWinsDeck, mockCKCard, mockDACard, mockGame, mockGameWithDeck, secondPlayerWinsDeck } from './mocks';

describe('switchPlayer', () => {
  it('switches between players correctly', () => {
    expect(switchPlayer(1)).toEqual(0);
    expect(switchPlayer(0)).toEqual(1);
  });
});

describe('getCardPoints', () => {
  it('returns points on card correctly', () => {
    expect(getCardPoints(mockCKCard)).toEqual(10);
    expect(getCardPoints(mockDACard)).toEqual(11);
  });
});

describe('getCardSymbol', () => {
  it('returns card symbol correctly', () => {
    expect(getCardSymbol(mockCKCard)).toEqual('CK');
    expect(getCardSymbol(mockDACard)).toEqual('DA');
  });
});

describe('calculatePoints', () => {
  it('calculates points + history from cards correctly', () => {
    const [points, cardHistory] = calculatePoints([mockCKCard, mockDACard]);
    expect(points).toEqual(21);
    expect(cardHistory).toEqual(['CK', 'DA']);
  });
});

describe('markGameWon', () => {
  it('marks the game as won correctly', () => {
    const updatedGame = markGameWon(mockGameWithDeck, 0);
    expect(updatedGame.status).toEqual('won');
    expect(updatedGame.winner).toEqual(updatedGame.players[0].name);
  });
});

describe('makeSingleMove', () => {
  it('makes a single move correctly', () => {
    const firstPlayerWinsGame = {
      ...mockGame,
      deck: [...firstPlayerWinsDeck],
    };
    const cardPoints = getCardPoints(firstPlayerWinsDeck[0]);
    const firstGameResults = makeSingleMove(firstPlayerWinsGame, 0);
    expect(firstGameResults.players[0].points).toEqual(cardPoints);
  });
});

describe('makeFirstMove', () => {
  it('makes first move correctly', () => {
    const firstPlayerWinsGame = {
      ...mockGame,
      deck: [...firstPlayerWinsDeck],
    };

    const secondPlayerWinsGame = {
      ...mockGame,
      deck: [...secondPlayerWinsDeck],
    };

    const firstGameResults = makeFirstMove(firstPlayerWinsGame);
    const secondGameResults = makeFirstMove(secondPlayerWinsGame);

    expect(firstGameResults.winner).toEqual(mockGame.players[0].name);
    expect(secondGameResults.winner).toEqual(mockGame.players[1].name);
  });
});

describe('makeNextMove', () => {
  it('first player gets more than 21', () => {
    const firstPlayerExceeds21Game = {
      ...mockGame,
      deck: [...firstPlayerExceeds21],
    };
    const afterFirstMove = makeFirstMove(firstPlayerExceeds21Game);

    expect(afterFirstMove.players[0].points).toEqual(4);

    const afterNextMove = makeNextMove(afterFirstMove);

    expect(afterNextMove.winner).toEqual(mockGame.players[1].name);
  });
});
