import {render} from '../framework/render.js';
import FilmView from '../view/film-view';
import FilmDetailsView from '../view/film-details-view';
import {isEscapeKey} from '../util';
import {OVERFLOW_HIDDEN_CLASS} from '../const';

export default class FilmPresenter {
  #filmListContainer = null;
  #mainContainer = null;

  #filmDetailsComponent = null;
  #filmComponent = null;

  #film = null;

  constructor(filmListContainer, mainContainer) {
    this.#filmListContainer = filmListContainer;
    this.#mainContainer = mainContainer;
  }

  init = (film) => {
    this.#film = film;

    this.#filmComponent = new FilmView(film);
    this.#filmDetailsComponent = new FilmDetailsView(film);

    this.#filmComponent.setOpenPopupClickHandler(this.#handleClick);
    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCloseClick);

    render(this.#filmComponent, this.#filmListContainer.element);
  };

  #hideFilmDetails = () => {
    this.#filmDetailsComponent.element.remove();
    this.#filmDetailsComponent.removeElement();
    document.body.classList.remove(OVERFLOW_HIDDEN_CLASS);
    document.removeEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #renderFilmDetails = () => {
    render(this.#filmDetailsComponent, this.#mainContainer);
  };

  #showFilmDetails = () => {
    const oldFilmDetailsElement = document.querySelector('.film-details');

    if (oldFilmDetailsElement) {
      oldFilmDetailsElement.remove();
    }

    this.#renderFilmDetails(this.#film);

    document.body.classList.add(OVERFLOW_HIDDEN_CLASS);
    document.addEventListener('keydown', this.#onEscKeyDownHandler);
  };

  #onEscKeyDownHandler = (evt) => {
    if (isEscapeKey) {
      evt.preventDefault();
      this.#hideFilmDetails();
    }
  };

  #handleClick = () => {
    this.#showFilmDetails();
  };

  #handleCloseClick = () => {
    this.#hideFilmDetails();
  };
}
