import {render, remove} from '../framework/render.js';
import FilmView from '../view/film-view';
import FilmDetailsPresenter from './film-details-presenter';

export default class FilmPresenter {
  #filmListContainer = null;
  #mainContainer = null;

  #filmComponent = null;

  #film = null;

  constructor(filmListContainer, mainContainer) {
    this.#filmListContainer = filmListContainer;
    this.#mainContainer = mainContainer;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;

    this.#filmComponent = new FilmView(film);
    this.#filmComponent.setOpenPopupClickHandler(this.#handleClick);

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmListContainer.element);
    }
  };

  destroy = () => {
    remove(this.#filmComponent);
  };

  #showFilmDetails = () => {
    const filmDetailsPresenter = new FilmDetailsPresenter(this.#mainContainer);
    filmDetailsPresenter.init(this.#film);
  };

  #handleClick = () => {
    this.#showFilmDetails();
  };
}
