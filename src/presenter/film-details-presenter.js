import {render} from '../framework/render';
import FilmDetailsView from '../view/film-details-view';

import {isEscapeKey} from '../util';
import {OVERFLOW_HIDDEN_CLASS, UpdateType, UserAction} from '../const';

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

      this.#filmDetailsComponent.setAddCommentHandler(this.#onAddComment);
      this.#filmDetailsComponent.setDeleteCommentHandler(this.#onDeleteComment);

      this.#renderFilmDetails();
    }
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
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#hideFilmDetails();
    }
  };

  #handleCloseClick = () => {
    this.#hideFilmDetails();
  };

  #handleFavoriteClick = (update) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update
    );
  };

  #handletWatchedClick = (update) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update
    );
  };

  #handleWatchListClick = (update) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update
    );
  };

  #onAddComment = (update) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update
    );
  };

  #onDeleteComment = (update) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      update
    );
  };
}
