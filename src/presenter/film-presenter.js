import {render, remove, replace} from '../framework/render.js';
import FilmView from '../view/film-view';
import FilmDetailsPresenter from './film-details-presenter';

export default class FilmPresenter {
  #filmListContainer = null;
  #mainContainer = null;
  #filmComponent = null;
  #changeData = null;
  #filmDetailsPresenter = null;
  #getCurrentFilmDetails = null;

  #film = null;

  constructor(filmListContainer, mainContainer, changeData, getCurrentFilmDetails) {
    this.#filmListContainer = filmListContainer;
    this.#mainContainer = mainContainer;
    this.#changeData = changeData;
    this.#getCurrentFilmDetails = getCurrentFilmDetails;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmView(film);

    this.#filmComponent.setOpenPopupClickHandler(this.#handleClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setWatchedClickHandler(this.#handletWatchedClick);
    this.#filmComponent.setWatchListClickHandler(this.#handleWatchListClick);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer.element);
      return;
    }

    if (this.#filmListContainer.element.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
  };

  #handleModeFilmDetails = () => {
    this.#filmDetailsPresenter.resetView();
  };

  #showFilmDetails = () => {
    this.#filmDetailsPresenter = new FilmDetailsPresenter(this.#mainContainer, this.#changeData, this.#handleModeFilmDetails);
    this.#filmDetailsPresenter.init(this.#film);
    this.#getCurrentFilmDetails(this.#filmDetailsPresenter);
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

  #handleClick = () => {
    this.#showFilmDetails();
  };
}
