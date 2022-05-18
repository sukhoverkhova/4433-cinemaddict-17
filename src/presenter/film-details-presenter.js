import {render} from '../framework/render.js';
import FilmDetailsView from '../view/film-details-view';
import {isEscapeKey} from '../util';
import {OVERFLOW_HIDDEN_CLASS} from '../const';

export default class FilmDetailsPresenter {
  #mainContainer = null;

  #filmDetailsComponent = null;
  #film = null;

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (film) => {
    this.#film = film;

    this.#filmDetailsComponent = new FilmDetailsView(film);
    this.#renderFilmDetails();

    this.#filmDetailsComponent.setCloseClickHandler(this.#handleCloseClick);
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
}
