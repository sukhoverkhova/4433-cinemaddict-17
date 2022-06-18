import {render, remove} from '../framework/render';
import UiBlocker from '../framework/ui-blocker/ui-blocker';

import NoFilmsView from '../view/no-films-view';
import SortView from '../view/sort-view';
import FilmsListView from '../view/films-list-view';
import ShowMoreButtonView from '../view/show-more-button-view';

import LoadingView from '../view/loading-view';
import FooterView from '../view/footer-view';

import FilmPresenter from './film-presenter';
import UserProfilePresenter from './user-profile-presenter';

import {sortFilmByDate, sortFilmsByRating, sortFilmsByCommentsCount} from '../util';
import {FILMS_COUNT_PER_STEP, SortType, UpdateType, UserAction, FilterType} from '../const';
import {filter} from '../filter';

const TimeLimit = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const siteHeaderElement = document.querySelector('.header');
const bodyElement = document.querySelector('body');

export default class FilmListPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #filterModel = null;
  #commentsModel = null;
  #noFilmsComponent = null;
  #showMoreButtonComponent = null;
  #sortComponent = null;
  #filmDetailsPresenter = null;

  #allFilmsPresenters = new Map();
  #topRatedFilmsPresenters = new Map();
  #mostCommentedFilmsPresenters = new Map();

  #userProfilePresenter = new UserProfilePresenter(siteHeaderElement);

  #filmsListComponent = new FilmsListView();
  #loadingComponent = new LoadingView();
  #footerView = new FooterView();

  #filterType = FilterType.ALL;
  #currentSortType = SortType.DEFAULT;
  #renderedFilmCount = FILMS_COUNT_PER_STEP;
  #isLoading = true;

  #uiBlocker = new UiBlocker(TimeLimit.LOWER_LIMIT, TimeLimit.UPPER_LIMIT);

  constructor(mainContainer, filmsModel, filterModel, commentsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;
    this.#commentsModel = commentsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
    this.#commentsModel.addObserver(this.#handleModelCommentEvent);

    render(this.#footerView, bodyElement);
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

  #sortTypeChangeHandler = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearFilmList({resetRenderedFilmCount: true});
    this.#renderPage();
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    this.#sortComponent.setSortTypeChangeHandler(this.#sortTypeChangeHandler);

    render(this.#sortComponent, this.#mainContainer);
  };

  #getCurrentFilmDetailsPresenter = (filmDetailsPresenter) => {
    this.#filmDetailsPresenter = filmDetailsPresenter;
  };

  #updateUserProfile = (films) => {
    const watchedFilms = filter['alreadyWatched'](films);
    this.#userProfilePresenter.init(watchedFilms.length);
  };

  #handleViewAction = async (
    actionType,
    updateType,
    update,
    setFeedback = () => {},
    setAborting = () => {}) => {
    this.#uiBlocker.block();
    switch (actionType) {
      case UserAction.UPDATE_FILM_PARAMS:
        try {
          await this.#filmsModel.updateFilm(updateType, update);
          this.#updateUserProfile(this.#filmsModel.films);
        } catch(error) {
          setAborting();
        }
        break;
      case UserAction.ADD_COMMENT:
        try {
          setFeedback();
          await this.#commentsModel.addComment(updateType, update);
        } catch(error) {
          setAborting();
        }
        break;
      case UserAction.DELETE_COMMENT:
        try {
          setFeedback();
          await this.#commentsModel.deleteComment(updateType, update);
        } catch(error) {
          setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#initPresentersItem(this.#allFilmsPresenters, data);
        this.#initPresentersItem(this.#topRatedFilmsPresenters, data);
        this.#initPresentersItem(this.#mostCommentedFilmsPresenters, data);

        if (this.#filmDetailsPresenter !== null) {
          this.#filmDetailsPresenter.init(data);
        }
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

  #handleModelCommentEvent = async (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        await this.#filmsModel.updateFilm(updateType, data);
        this.#clearPresenters(this.#mostCommentedFilmsPresenters);
        this.#renderMostCommented(this.#filmsModel.films);
        break;
    }
  };

  #initPresentersItem = (presenters, data) => {
    if (presenters.get(data.id)) {
      presenters.get(data.id).init(data);
    }
  };

  #clearFilmList = ({resetRenderedFilmCount = false, resetSortType = false} = {}) => {
    const filmCount = this.films.length;

    this.#clearPresenters(this.#allFilmsPresenters);
    this.#clearPresenters(this.#topRatedFilmsPresenters);
    this.#clearPresenters(this.#mostCommentedFilmsPresenters);

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#noFilmsComponent);
    remove(this.#showMoreButtonComponent);

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILMS_COUNT_PER_STEP;
    } else {
      this.#renderedFilmCount = Math.min(filmCount, this.#renderedFilmCount);
    }

    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #clearPresenters = (presenters) => {
    presenters.forEach((presenter) => presenter.destroy());
    presenters.clear();
  };

  #showMoreClickHandler = () => {
    this.#showMoreFilms();
  };

  #showMoreFilms = () => {
    const filmCount = this.films.length;
    const newRenderedfilmCount = Math.min(filmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedfilmCount);

    this.#renderFilmItems(films);
    this.#renderedFilmCount = newRenderedfilmCount;

    if (this.#renderedFilmCount >= this.#filmsModel.films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    render(this.#showMoreButtonComponent, this.#filmsListComponent.getContainerElement());
    this.#showMoreButtonComponent.setClickHandler(this.#showMoreClickHandler);
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

  #renderFilm = (
    film,
    container = this.#filmsListComponent.getAllMoviesElement(),
    filmType = 'DEFAULT') => {
    const filmPresenter = new FilmPresenter(
      container,
      this.#mainContainer,
      this.#handleViewAction,
      this.#getCurrentFilmDetailsPresenter,
      this.#commentsModel
    );

    filmPresenter.init(film);

    if (filmType === 'DEFAULT') {
      this.#allFilmsPresenters.set(film.id, filmPresenter);
      return;
    }

    if (filmType === 'TOP_RATED') {
      this.#topRatedFilmsPresenters.set(film.id, filmPresenter);
      return;
    }

    if (filmType === 'MOST_COMMENTED') {
      this.#mostCommentedFilmsPresenters.set(film.id, filmPresenter);
    }
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

    this.#updateUserProfile(this.#filmsModel.films);
    this.#renderSort();

    render(this.#filmsListComponent, this.#mainContainer);
    this.#renderFilmItems(films.slice(0, Math.min(filmsCount, this.#renderedFilmCount)));

    if (filmsCount > FILMS_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }

    this.#footerView.update(this.#filmsModel.films.length);

    this.#renderTopRated(this.#filmsModel.films);
    this.#renderMostCommented(this.#filmsModel.films);
  };

  #renderTopRated = (films) => {
    const sortedFilms = films.sort(sortFilmsByRating).slice(0, 2);
    sortedFilms.forEach((film) => this.#renderFilm(film, this.#filmsListComponent.getTopRatedMoviesElement(), 'TOP_RATED'));
  };

  #renderMostCommented = (films) => {
    const sortedFilms = films.sort(sortFilmsByCommentsCount).slice(0, 2);
    sortedFilms.forEach((film) => this.#renderFilm(film, this.#filmsListComponent.getMostCommentedElement(), 'MOST_COMMENTED'));
  };
}
