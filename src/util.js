import dayjs from 'dayjs';
import relative from 'dayjs/plugin/relativeTime';
import {ESCAPE_KEY} from './const';

export const minutesToHours = (minutesCount) => {
  const minutes = minutesCount % 60;
  const hours = (minutesCount > 60) ? Math.floor(minutesCount / 60) : 0;

  const hoursResult = (hours > 0) ? `${hours}h ` : '';
  const minutesResult = (minutes > 0) ? `${minutes}m` : '';

  return hoursResult + minutesResult;
};

export const getYearOfDate = (date) => dayjs(date).format('YYYY');

export const humanizeDate = (date, format = 'D MMMM YYYY') => dayjs(date).format(format);

export const isEscapeKey = (evt) => evt.key === ESCAPE_KEY;

export const getWeightForNullDate = (itemA, itemB) => {
  if (itemA === null && itemB === null) {
    return 0;
  }

  if (itemA === null) {
    return 1;
  }

  if (itemB === null) {
    return -1;
  }

  return null;
};

export const sortFilmByDate = (filmA, filmB) => {
  const weight = getWeightForNullDate(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

export const sortFilmsByRating = (filmA, filmB) => (filmB.filmInfo.totalRating - filmA.filmInfo.totalRating);

export const sortFilmsByCommentsCount = (filmA, filmB) => (filmB.comments.length - filmA.comments.length);

export const getDateFromNow = (date) => {
  dayjs.extend(relative);
  return dayjs().from(date);
};

