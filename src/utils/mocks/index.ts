import { IGame } from "../../types";
import { IDeckCard, IGameWithDeck } from '../../types/index';

export const SUITS: Array<IDeckCard['suit']> = ['CLUBS', 'DIAMONDS', 'SPADES', 'HEARTS'];

export const mockCKCard: IDeckCard = {
  suit: 'CLUBS',
  value: 'K',
};

export const mockDACard: IDeckCard = {
  suit: 'DIAMONDS',
  value: 'A',
};

export const mockS7Card: IDeckCard = {
  suit: 'SPADES',
  value: '7',
};

export const mockH2Card: IDeckCard = {
  suit: 'HEARTS',
  value: '2',
};

export const mockGame: IGame = {
  createdAt: new Date(),
  id: 'mock-game',
  players: [
    { name: 'issaaf', points: 0, cards: []},
    {name : 'bob', points: 0, cards: []},
  ],
  status: 'created',
};

export const mockGameWithDeck: IGameWithDeck = {
  ...mockGame,
  deck: [mockCKCard, mockDACard, mockCKCard, mockCKCard],
};



export const firstPlayerWinsDeck = [mockCKCard, mockDACard, mockCKCard, mockH2Card];
export const secondPlayerWinsDeck = [mockCKCard, mockH2Card, mockCKCard, mockDACard];

/*
1st round:
first player: 2 + 2 = 4
second player: 2 + 2 =4

2nd round:
first player: (4) + 10 + 10 = 24 LOSES

*/
export const firstPlayerExceeds21 = [mockH2Card, mockH2Card, mockH2Card, mockH2Card, mockCKCard, mockCKCard];


export const secondPlayerExceedsFirst = [mockH2Card, mockH2Card, mockH2Card, mockH2Card, mockCKCard, mockCKCard];
