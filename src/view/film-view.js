import AbstractView from '../framework/view/abstract-stateful-view';
import {getYearOfDate, minutesToHours} from '../util';
import {COMMENTS_MAX_LENGTH} from '../const';

const ACTIVE_CLASS = 'film-card__controls-item--active';

const createFilmTemplate = (film) => {
  const filmInfo = film.filmInfo;
  const filmComments = film.comments;
  const userDetails = film.userDetails;

  const cropDescription = (description) => {
    const croppedDescription = description.substring(0, COMMENTS_MAX_LENGTH - 1);

    return `${croppedDescription}...`;
  };

  const getActiveCLassElement = (flag) => {
    const elementClass = flag ? ACTIVE_CLASS : '';
    return elementClass;
  };

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${getYearOfDate(filmInfo.release.date)}</span>
          <span class="film-card__duration">${minutesToHours(filmInfo.runtime)}</span>
          <span class="film-card__genre">${filmInfo.genre.join(', ')}</span>
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
  #controlItem = null;

  constructor(film) {
    super();
    this.#film = film;

    this._state = {...film};
    this.#setInnerHandlers();
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.element.scrollTo(0, this._state.scrollPosition);
  };


  #setInnerHandlers = () => {
    this.element.addEventListener('click', this.#openPopupClickHandler);
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  get template() {
    return createFilmTemplate(this.#film);
  }

  updateFilm = (updatedFilm) => {
    this.updateElement({...updatedFilm});
  };

  setOpenPopupClickHandler = (callback) => {
    this._callback.openPopupClick = callback;
    this.element.addEventListener('click', this.#openPopupClickHandler);
  };

  #openPopupClickHandler = (evt) => {
    evt.preventDefault();

    if (evt.target.nodeName !== 'BUTTON') {
      this._callback.openPopupClick();
    }
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.favorite = !this._state.userDetails.favorite;

    const updatedFilm = {...this._state};
    this._callback.favoriteClick(updatedFilm);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.alreadyWatched = !this._state.userDetails.alreadyWatched;

    const updatedFilm = {...this._state};
    this._callback.watchedClick(updatedFilm);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.watchlist = !this._state.userDetails.watchlist;

    const updatedFilm = {...this._state};
    this._callback.watchListClick(updatedFilm);
  };
}
