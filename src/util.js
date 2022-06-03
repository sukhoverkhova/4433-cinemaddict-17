import dayjs from 'dayjs';
import {ESCAPE_KEY} from './const';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const generateRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};

export const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);

  return dayjs().add(daysGap, 'day').toDate();
};

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

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

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

