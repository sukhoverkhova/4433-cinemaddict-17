import AbstractView from '../framework/view/abstract-stateful-view';
import {getYearOfDate} from '../util';
import {COMMENTS_MAX_LENGTH} from '../const';

const createFilmTemplate = (film) => {
  const filmInfo = film.filmInfo;
  const filmComments = film.comments;
  const userDetails = film.userDetails;

  const cropDescription = (description) => {
    const croppedDescription = description.substring(0, COMMENTS_MAX_LENGTH - 1);

    return `${croppedDescription}...`;
  };

  const getActiveCLassElement = (flag) => {
    const elementClass = flag ? 'film-card__controls-item--active' : '';
    return elementClass;
  };

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${getYearOfDate(filmInfo.release.date)}</span>
          <span class="film-card__duration">1h 55m</span>
          <span class="film-card__genre">${filmInfo.genre}</span>
        </p>
        <img src="./${filmInfo.poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${(filmInfo.description > COMMENTS_MAX_LENGTH) ? filmInfo.description : cropDescription(filmInfo.description)}</p>
        <span class="film-card__comments">${filmComments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getActiveCLassElement(userDetails.watchlist)}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getActiveCLassElement(userDetails.alreadyWatched)}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${getActiveCLassElement(userDetails.favorite)}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmView extends AbstractView {
  #film = null;

  constructor(film) {
    super();
    this.#film = film;
  }

  get template() {
    return createFilmTemplate(this.#film);
  }
}
