import {render} from '../framework/render.js';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListSectionView from '../view/films-list-section-view';
import FilmsListHeaderView from '../view/films-list-header-view';
import NoFilmsView from '../view/no-films-view';
import SortView from '../view/sort-view';

import FilmListPresenter from './films-list-presenter';

export default class FilmListWrapper {
  #mainContainer = null;
  #filmsModel = null;

  #filmsListContainerComponent = null;
  #filmsListSectionComponent = null;
  #sortComponent = null;
  #noFilmsComponent = null;
  #filmsListHeaderComponent = null;

  #films = [];

  constructor(mainContainer, filmsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];

    this.#filmsListContainerComponent = new FilmsListContainerView();
    this.#filmsListSectionComponent = new FilmsListSectionView();
    this.#sortComponent = new SortView();
    this.#noFilmsComponent = new NoFilmsView();
    this.#filmsListHeaderComponent = new FilmsListHeaderView();

    this.#renderFilmListWrapper();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainContainer);
  };

  #renderNoFilms = () => {
    render(this.#noFilmsComponent, this.#mainContainer);
  };

  #renderFilmsListContainer = () => {
    render(this.#filmsListContainerComponent, this.#mainContainer);
  };

  #renderFilmsListSection = () => {
    render(this.#filmsListSectionComponent, this.#filmsListContainerComponent.element);
  };

  #renderFilmsListHeader = () => {
    render(this.#filmsListHeaderComponent, this.#filmsListSectionComponent.element);
  };

  #renderFilmListWrapper = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {
      this.#renderSort();
      this.#renderFilmsListContainer();
      this.#renderFilmsListSection();
      this.#renderFilmsListHeader();

      const filmListPresenter = new FilmListPresenter(this.#mainContainer, this.#filmsListSectionComponent.element, this.#filmsModel);
      filmListPresenter.init();
    }
  };
}
