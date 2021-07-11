
export type GameStatus = "created" | "ongoing" | "draw" | "won";

export interface IPlayer {
  name: string;
  points: number;
  cards: string[];
}

export interface IGame  {
  id: string;
  status: GameStatus;
  createdAt: Date;
  endedAt?: Date;
  players: [IPlayer, IPlayer];
  winner?: string;
}

export interface IDeckCard  {
  suit: 'HEARTS' | 'DIAMONDS' | 'SPADES' | 'CLUBS';
  value: string;
}
export interface IGameWithDeck extends IGame {
 deck: IDeckCard[];
}
