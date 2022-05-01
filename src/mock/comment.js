import {generateRandomItem} from '../util.js';
import {AUTHORS, COMMENTS, EMOTIONS} from '../const.js';

export const generateComment = () => ({
  id: 0,
  author: generateRandomItem(AUTHORS),
  comment: generateRandomItem(COMMENTS),
  date: '2019-05-11T16:12:32.554Z',
  emotion: generateRandomItem(EMOTIONS),
});
