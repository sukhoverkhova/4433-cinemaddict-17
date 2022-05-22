import {render} from '../framework/render.js';
import FilmDetailsView from '../view/film-details-view';

import {isEscapeKey} from '../util';
import {OVERFLOW_HIDDEN_CLASS} from '../const';

export default class FilmDetailsPresenter {
  #mainContainer = null;
  #changeData = null;

  #filmDetailsComponent = null;
  #film = null;

  constructor(mainContainer, changeData) {
    this.#mainContainer = mainContainer;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    this.#filmDetailsComponent = new FilmDetailsView(film);
    this.#renderFilmDetails();

    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCloseClick);
    this.#filmDetailsComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmDetailsComponent.setWatchedClickHandler(this.#handletWatchedClick);
    this.#filmDetailsComponent.setWatchListClickHandler(this.#handleWatchListClick);
  };

  #hideFilmDetails = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent.removeElement();
    document.body.classList.remove(OVERFLOW_HIDDEN_CLASS);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
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
    this.#changeData({...this.#film, favorite: !this.#film.favorite});
  };

  #handletWatchedClick = () => {
    this.#changeData({...this.#film, alreadyWatched: !this.#film.favorite});
  };

  #handleWatchListClick = () => {
    this.#changeData({...this.#film, watchlist: !this.#film.favorite});
  };
}
