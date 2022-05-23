import {getRandomInteger, generateRandomItem, generateDate} from '../util';
import {COMMENTS_MAX_COUNT, FILMS} from '../const';
import {generateComment} from './comment';
import {nanoid} from 'nanoid';

const generateCommentList = () => {
  const commentsCount = getRandomInteger(0, COMMENTS_MAX_COUNT);
  const commentsList = [];

  for( let i = 0; i < commentsCount; i++) {
    commentsList.push(generateComment());
  }

  return commentsList;
};

export const generateFilm = () => ({
  id: nanoid(),
  comments: generateCommentList(),
  filmInfo: generateRandomItem(FILMS),
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: generateDate(),
    favorite: Boolean(getRandomInteger(0, 1))
  }
});
