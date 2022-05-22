import {render, remove, replace} from '../framework/render.js';
import FilmView from '../view/film-view';
import FilmDetailsPresenter from './film-details-presenter';

export default class FilmPresenter {
  #filmListContainer = null;
  #mainContainer = null;
  #filmComponent = null;
  #changeData = null;

  #film = null;

  constructor(filmListContainer, mainContainer, changeData) {
    this.#filmListContainer = filmListContainer;
    this.#mainContainer = mainContainer;
    this.#changeData = changeData;
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

  #showFilmDetails = () => {
    const filmDetailsPresenter = new FilmDetailsPresenter(this.#mainContainer, this.#changeData);
    filmDetailsPresenter.init(this.#film);
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

  #handleClick = () => {
    this.#showFilmDetails();
  };
}
