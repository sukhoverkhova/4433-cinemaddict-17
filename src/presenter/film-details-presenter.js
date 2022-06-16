import {render, remove} from '../framework/render';
import FilmDetailsView from '../view/film-details-view';

import {isEscapeKey} from '../util';
import {OVERFLOW_HIDDEN_CLASS, UpdateType, UserAction} from '../const';

export default class FilmDetailsPresenter {
  #mainContainer = null;
  #changeData = null;

  #filmDetailsComponent = null;
  #film = null;
  #comments = null;
  #commentsModel = null;

  constructor(mainContainer, changeData, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#changeData = changeData;
    this.#commentsModel = commentsModel;
  }

  init = (film) => {
    this.#film = film;
    this.#loadComments(this.#film.id);
  };

  #loadComments = async (id) => {
    await this.#commentsModel
      .init(id)
      .finally(() => {
        this.#comments = this.#commentsModel.comments;
        this.#updateFilmDetails(this.#comments);
      });
  };

  #updateFilmDetails = (comments) => {
    if (this.#filmDetailsComponent !== null) {
      this.#filmDetailsComponent.updateFilm({...this.#film, commentList: comments});
    } else {
      this.#filmDetailsComponent = new FilmDetailsView({...this.#film, commentList: comments});
      this.#filmDetailsComponent.reset({...this.#film, commentList: comments});
      this.#renderFilmDetails();

      this.#filmDetailsComponent.setCloseClickHandler(this.#closeClickHandler);
      this.#filmDetailsComponent.setFavoriteClickHandler(this.#favoriteClickHandler);
      this.#filmDetailsComponent.setWatchedClickHandler(this.#watchedClickHandler);
      this.#filmDetailsComponent.setWatchListClickHandler(this.#watchListClickHandler);

      this.#filmDetailsComponent.setAddCommentHandler(this.#addCommentHandler);
      this.#filmDetailsComponent.setDeleteCommentHandler(this.#deleteCommentClickHandler);

      this.#commentsModel.addObserver(this.#handleModelEvent);

      this.#renderFilmDetails();
    }
  };

  #hideFilmDetails = () => {
    remove(this.#filmDetailsComponent);

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

  #closeClickHandler = () => {
    this.#hideFilmDetails();
  };

  #favoriteClickHandler = (update) => {
    this.#changeData(
      UserAction.UPDATE_FILM_PARAMS,
      UpdateType.PATCH,
      update
    );
  };

  #watchedClickHandler = (update) => {
    this.#changeData(
      UserAction.UPDATE_FILM_PARAMS,
      UpdateType.PATCH,
      update
    );
  };

  #watchListClickHandler = (update) => {
    this.#changeData(
      UserAction.UPDATE_FILM_PARAMS,
      UpdateType.PATCH,
      update,
      () => {},
      this.shakeControls(this.resetFilmState),
    );
  };

  #addCommentHandler = (update) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      update,
      this.setSaving,
      this.shakeComment(this.resetFilmState),
    );
  };

  #deleteCommentClickHandler = (update) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      update,
      this.setDeleting,
      this.shakeDeletingComment(this.resetFilmState, update.commentId),
    );
  };

  setSaving = () => {
    this.#filmDetailsComponent.updateElement({
      isSaving: true,
    });
  };

  setDeleting = () => {
    this.#filmDetailsComponent.updateElement({
      isDeleting: true,
    });
  };

  shakeComment = (callback) => () => {
    this.#filmDetailsComponent.shake
      .call({
        element: this.#filmDetailsComponent.element.querySelector('.film-details__new-comment')
      }, callback);
  };

  shakeDeletingComment = (callback, commentId) => () => {
    this.#filmDetailsComponent.shake
      .call({
        element: this.#filmDetailsComponent.element.querySelector(`button[data-buttonid='${commentId}']`).closest('.film-details__comment')
      }, callback);
  };

  shakeControls = (callback) => () => {
    this.#filmDetailsComponent.shake
      .call({
        element: this.#filmDetailsComponent.element.querySelector('.film-details__controls')
      }, callback);
  };

  resetFilmState = () => {
    this.#filmDetailsComponent.updateElement({
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    });
  };

  #handleModelEvent = (updateType, data) => {
    this.#filmDetailsComponent.updateFilm(data);
  };
}
