import {render} from '../framework/render.js';
import FilmsListView from '../view/films-list-view';

import FilmPresenter from './film-presenter';
import ShowMorePresenter from './show-more-presenter';

import {FILMS_COUNT_PER_STEP} from '../const';

export default class FilmListPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #filmsListSection = null;

  #filmsListComponent = new FilmsListView();
  #films = [];

  constructor(mainContainer, filmsListSection, filmsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsListSection = filmsListSection;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];

    this.#renderFilmList();
  };

  #renderFilmListWrapper = () => {
    render(this.#filmsListComponent, this.#filmsListSection);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListComponent, this.#mainContainer);
    filmPresenter.init(film);
  };

  #renderFilmList = () => {
    this.#renderFilmListWrapper();

    for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
      this.#renderFilm(this.#films[i]);
    }

    if (this.#films.length > FILMS_COUNT_PER_STEP) {
      const showMorePresenter = new ShowMorePresenter(this.#filmsListComponent, this.#mainContainer, this.#films);
      showMorePresenter.init();
    }
  };
}
