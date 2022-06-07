import {generateRandomItem, generateDate} from '../util';
import {AUTHORS, COMMENTS, EMOTIONS} from '../const';
import {nanoid} from 'nanoid';

export const generateComment = () => ({
  id: nanoid(),
  author: generateRandomItem(AUTHORS),
  comment: generateRandomItem(COMMENTS),
  date: generateDate(),
  emotion: generateRandomItem(EMOTIONS),
});
