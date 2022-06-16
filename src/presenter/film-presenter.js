import {render, remove, replace} from '../framework/render';
import FilmView from '../view/film-view';
import FilmDetailsPresenter from './film-details-presenter';
import {UserAction, UpdateType} from '../const';

export default class FilmPresenter {
  #filmListContainer = null;
  #mainContainer = null;
  #filmComponent = null;
  #changeData = null;
  #filmDetailsPresenter = null;
  #getCurrentFilmDetails = null;

  #commentsModel = null;

  #film = null;

  constructor(filmListContainer, mainContainer, changeData, getCurrentFilmDetails, commentsModel) {
    this.#filmListContainer = filmListContainer;
    this.#mainContainer = mainContainer;
    this.#changeData = changeData;
    this.#getCurrentFilmDetails = getCurrentFilmDetails;
    this.#commentsModel = commentsModel;
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

  updateFilm = (updated) => {
    this.#filmComponent.update(updated);
  };

  #showFilmDetails = () => {
    this.#filmDetailsPresenter = new FilmDetailsPresenter(
      this.#mainContainer,
      this.#changeData,
      this.#commentsModel
    );
    this.#filmDetailsPresenter.init(this.#film);
    this.#getCurrentFilmDetails(this.#filmDetailsPresenter);
  };

  #handleWatchListClick = (update) => {
    this.#changeData(
      UserAction.UPDATE_FILM_PARAMS,
      UpdateType.PATCH,
      update
    );
  };

  #handletWatchedClick = (update) => {
    this.#changeData(
      UserAction.UPDATE_FILM_PARAMS,
      UpdateType.PATCH,
      update
    );
  };

  #handleFavoriteClick = (update) => {
    this.#changeData(
      UserAction.UPDATE_FILM_PARAMS,
      UpdateType.PATCH,
      update
    );
  };

  #handleClick = () => {
    this.#showFilmDetails();
  };
}
