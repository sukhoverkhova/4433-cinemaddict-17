import {render} from '../framework/render.js';
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

    this.#filmComponent = new FilmView(film);
    this.#filmComponent.setOpenPopupClickHandler(this.#handleClick);

    render(this.#filmComponent, this.#filmListContainer.element);
  };

  #showFilmDetails = () => {
    const filmDetailsPresenter = new FilmDetailsPresenter(this.#mainContainer);
    filmDetailsPresenter.init(this.#film);
  };

  #handleClick = () => {
    this.#showFilmDetails();
  };
}
