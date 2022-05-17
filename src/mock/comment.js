import {generateRandomItem, generateDate} from '../util';
import {AUTHORS, COMMENTS, EMOTIONS} from '../const';

export const generateComment = () => ({
  id: 0,
  author: generateRandomItem(AUTHORS),
  comment: generateRandomItem(COMMENTS),
  date: generateDate(),
  emotion: generateRandomItem(EMOTIONS),
});
