import {render} from '../framework/render';
import FilmDetailsView from '../view/film-details-view';

import {isEscapeKey} from '../util';
import {OVERFLOW_HIDDEN_CLASS} from '../const';

const Mode = {
  SHOWED: 'SHOWED',
  HIDDEN: 'HIDDEN',
};

export default class FilmDetailsPresenter {
  #mainContainer = null;
  #changeData = null;
  #changeModeFilmDetails = null;

  #filmDetailsComponent = null;
  #film = null;
  #mode = Mode.HIDDEN;

  constructor(mainContainer, changeData, changeModeFilmDetails) {
    this.#mainContainer = mainContainer;
    this.#changeData = changeData;
    this.#changeModeFilmDetails = changeModeFilmDetails;
  }

  init = (film) => {
    this.#film = film;

    if (this.#filmDetailsComponent !== null) {
      this.#filmDetailsComponent.updateFilm(film);
    } else {
      this.#filmDetailsComponent = new FilmDetailsView(film);
      this.#filmDetailsComponent.reset(this.#film);
      this.#renderFilmDetails();

      this.#filmDetailsComponent.setCloseClickHandler(this.#handleCloseClick);
      this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
      this.#filmDetailsComponent.setWatchedClickHandler(this.#handletWatchedClick);
      this.#filmDetailsComponent.setWatchListClickHandler(this.#handleWatchListClick);

      this.#renderFilmDetails();
    }
  };

  resetView = () => {
    if (this.#mode !== Mode.HIDDEN) {
      this.#hideFilmDetails();
    }
  };

  #hideFilmDetails = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent.removeElement();
    document.body.classList.remove(OVERFLOW_HIDDEN_CLASS);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);

    this.#mode = Mode.HIDDEN;
  };

  #renderFilmDetails = () => {
    const oldFilmDetailsElement = document.querySelector('.film-details');

    if (oldFilmDetailsElement) {
      oldFilmDetailsElement.remove();
    }

    render(this.#filmDetailsComponent, this.#mainContainer);

    document.body.classList.add(OVERFLOW_HIDDEN_CLASS);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      this.#hideFilmDetails();
    }
  };

  #handleCloseClick = () => {
    this.#hideFilmDetails();
  };

  #handleFavoriteClick = () => {
    this.#film.userDetails.favorite = !this.#film.userDetails.favorite;
    this.#changeData(this.#film);
  };

  #handletWatchedClick = () => {
    this.#film.userDetails.alreadyWatched = !this.#film.userDetails.alreadyWatched;
    this.#changeData(this.#film);
  };

  #handleWatchListClick = () => {
    this.#film.userDetails.watchlist = !this.#film.userDetails.watchlist;
    this.#changeData(this.#film);
  };
}
