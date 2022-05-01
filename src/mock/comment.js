import {generateRandomItem, generateDate} from '../util.js';
import {AUTHORS, COMMENTS, EMOTIONS} from '../const.js';

export const generateComment = () => ({
  id: 0,
  author: generateRandomItem(AUTHORS),
  comment: generateRandomItem(COMMENTS),
  date: generateDate(),
  emotion: generateRandomItem(EMOTIONS),
});
