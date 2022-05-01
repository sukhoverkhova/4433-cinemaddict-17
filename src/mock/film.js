import {getRandomInteger, generateRandomItem} from '../util.js';
import {COMMENTS_MAX_COUNT, FILMS} from '../const.js';
import {generateComment} from './comment.js';

const generateCommentList = () => {
  const commentsCount = getRandomInteger(0, COMMENTS_MAX_COUNT);
  const commentsList = [];

  for( let i = 0; i < commentsCount; i++) {
    commentsList.push(generateComment());
  }

  return commentsList;
};

export const generateFilm = () => ({
  id: 0,
  comments: generateCommentList(),
  filmInfo: generateRandomItem(FILMS),
  userDetails: {
    watchlist: false,
    alreadyWatched: true,
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: false
  }
});

