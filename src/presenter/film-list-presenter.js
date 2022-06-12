import {render, remove} from '../framework/render';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListSectionView from '../view/films-list-section-view';
import FilmsListHeaderView from '../view/films-list-header-view';
import NoFilmsView from '../view/no-films-view';
import SortView from '../view/sort-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import LoadingView from '../view/loading-view';

import FilmPresenter from './film-presenter';

import {sortFilmByDate, sortFilmsByRating} from '../util';
import {FILMS_COUNT_PER_STEP, SortType, UpdateType, UserAction, FilterType} from '../const';
import {filter} from '../filter';

export default class FilmListPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #noFilmsComponent = null;
  #showMoreButtonCompoment = null;
  #sortComponent = null;
  #filmDetailsPresenter = null;

  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #filmsListHeaderComponent = new FilmsListHeaderView();
  #filmsListComponent = new FilmsListView();
  #loadingComponent = new LoadingView();
  #filmPresenter = new Map();

  #filterType = FilterType.ALL;
  #currentSortType = SortType.DEFAULT;
  #renderedFilmCount = FILMS_COUNT_PER_STEP;
  #isLoading = true;

  constructor(mainContainer, filmsModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        filteredFilms.sort(sortFilmByDate);
        break;
      case SortType.RATING:
        filteredFilms.sort(sortFilmsByRating);
        break;
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderPage();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmList({resetRenderedFilmCount: true});
    this.#renderPage();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#mainContainer);
  };

  #getCurrentFilmDetailsPresenter = (filmDetailsPresenter) => {
    this.#filmDetailsPresenter = filmDetailsPresenter;
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_FILM_PARAMS:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearFilmList();
        this.#renderPage();
        break;
      case UpdateType.MAJOR:
        this.#clearFilmList({resetRenderedFilmCount: true, resetSortType: true});
        this.#renderPage();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderPage();
        break;
    }
  };

  #clearFilmList = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noFilmsComponent);
    remove(this.#showMoreButtonCompoment);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #handleShowMoreClick = () => {
    this.#showMoreFilms();
  };

  #showMoreFilms = () => {
    const filmCount = this.films.length;
    const newRenderedfilmCount = Math.min(filmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedfilmCount);

    this.#renderFilmItems(films);
    this.#renderedFilmCount = newRenderedfilmCount;

    if (this.#renderedFilmCount >= this.#filmsModel.films.length) {
      this.#showMoreButtonCompoment.element.remove();
      this.#showMoreButtonCompoment.removeElement();
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonCompoment = new ShowMoreButtonView();
    render(this.#showMoreButtonCompoment, this.#filmsListSectionComponent.element);
    this.#showMoreButtonCompoment.setClickHandler(this.#handleShowMoreClick);
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#mainContainer);
  };

  #renderNoFilms = () => {
    this.#noFilmsComponent = new NoFilmsView(this.#filterType);
    render(this.#noFilmsComponent, this.#mainContainer);
  };

  #renderFilmItems = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmsListComponent, this.#mainContainer, this.#handleViewAction, this.#getCurrentFilmDetailsPresenter);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  #renderPage = () => {
    const films = this.films;
    const filmsCount = films.length;

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (filmsCount === 0) {
      this.#renderNoFilms();
      return;
    }

    this.#renderSort();
    render(this.#filmsListContainerComponent, this.#mainContainer);
    render(this.#filmsListSectionComponent, this.#filmsListContainerComponent.element);
    render(this.#filmsListHeaderComponent, this.#filmsListSectionComponent.element);

    render(this.#filmsListComponent, this.#filmsListSectionComponent.element);

    this.#renderFilmItems(films.slice(0, Math.min(filmsCount, this.#renderedFilmCount)));

    if (filmsCount > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };
}
