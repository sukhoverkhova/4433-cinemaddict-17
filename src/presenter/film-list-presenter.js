import {render} from '../framework/render';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListSectionView from '../view/films-list-section-view';
import FilmsListHeaderView from '../view/films-list-header-view';
import NoFilmsView from '../view/no-films-view';
import SortView from '../view/sort-view';
import FilmsListView from '../view/films-list-view';

import FilmPresenter from './film-presenter';
import ShowMorePresenter from './show-more-presenter';

import {updateItem, sortFilmByDate, sortFilmsByRating} from '../util';
import {FILMS_COUNT_PER_STEP, SortType} from '../const';

export default class FilmListPresenter {
  #mainContainer = null;
  #filmsModel = null;

  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #sortComponent = new SortView();
  #noFilmsComponent = new NoFilmsView();
  #filmsListHeaderComponent = new FilmsListHeaderView();
  #filmsListComponent = new FilmsListView();
  #showMorePresenter = null;

  #filmPresenter = new Map();
  #filmDetailsPresenter = null;

  #currentSortType = SortType.DEFAULT;
  #sourcedBoardFilms = [];

  #films = [];

  #renderedFilmCount = FILMS_COUNT_PER_STEP;

  constructor(mainContainer, filmsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];

    this.#showMorePresenter = new ShowMorePresenter(
      this.#filmsListComponent,
      this.#mainContainer,
      this.#films,
      this.#handleFilmChange,
      this.#filmPresenter,
      this.#getRenderedFilmsCount
    );

    this.#sourcedBoardFilms = [...this.#filmsModel.films];

    this.#renderFilmListWrapper();
  };

  #sortFilms = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#films.sort(sortFilmByDate);
        break;
      case SortType.RATING:
        this.#films.sort(sortFilmsByRating);
        break;
      default:
        this.#films = [...this.#sourcedBoardFilms];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortFilms(sortType);
    this.#clearFilmList();
    this.#renderFilmList();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainContainer);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
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

  #getCurrentFilmDetailsPresenter = (filmDetailsPresenter) => {
    this.#filmDetailsPresenter = filmDetailsPresenter;
  };

  #getRenderedFilmsCount = (filmCount) => {
    this.#renderedFilmCount = filmCount;
  };

  #handleFilmChange = (updatedFilm) => {
    this.#films = updateItem(this.#films, updatedFilm);
    this.#sourcedBoardFilms = updateItem(this.#sourcedBoardFilms, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
    this.#filmDetailsPresenter.init(updatedFilm);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListComponent, this.#mainContainer, this.#handleFilmChange, this.#getCurrentFilmDetailsPresenter);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #clearFilmList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#showMorePresenter.destroy();
  };

  #renderFilmList = () => {
    render(this.#filmsListComponent, this.#filmsListSectionComponent.element);

    for (let i = 0; i < Math.min(this.#films.length, this.#renderedFilmCount); i++) {
      this.#renderFilm(this.#films[i]);
    }

    if (this.#films.length > this.#renderedFilmCount) {
      this.#showMorePresenter.init();
    }
  };

  #renderFilmListWrapper = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {
      this.#renderSort();
      this.#renderFilmsListContainer();
      this.#renderFilmsListSection();
      this.#renderFilmsListHeader();
      this.#renderFilmList();
    }
  };
}
