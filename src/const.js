export const COMMENTS_MAX_LENGTH = 140;

export const FILMS_COUNT_PER_STEP = 5;

export const ESCAPE_KEY = 'Escape';
export const OVERFLOW_HIDDEN_CLASS = 'hide-overflow';

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT'
};

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  ALREADY_WATCHED: 'alreadyWatched',
  FAVORITES: 'favorites'
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const headerType = {
  DEFAULT: 'All movies. Upcoming',
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented',
};

export const AUTHORIZATION = 'Basic sdfsdfsdflsdkf';
export const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';
