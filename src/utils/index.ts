import omit from 'lodash/omit';
import randomWords from 'random-words';
import { IGame, IGameWithDeck } from '../types/index';

export const generateId = () => {
  return randomWords({exactly: 1, wordsPerString: 2, separator: '-'})[0];
};

export const omitDeck = (game: IGameWithDeck): IGame => {
  return omit(game, ['deck']);
};

export * from './gameplay';
