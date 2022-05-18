import {render, RenderPosition, replace, remove} from '../framework/render.js';
import FilmsListContainerView from '../view/films-list-container-view';
import FilmsListSectionView from '../view/films-list-section-view';
import FilmsListHeaderView from '../view/films-list-header-view';
import FilmsListView from '../view/films-list-view';
import FilmView from '../view/film-view';
import FilmDetailsView from '../view/film-details-view';
import NoFilmsView from '../view/no-films-view';
import SortView from '../view/sort-view';
import ShowMoreButtonView from '../view/show-more-button-view';

import {isEscapeKey} from '../util';
import {OVERFLOW_HIDDEN_CLASS, FILMS_COUNT_PER_STEP} from '../const';

export default class FilmListPresenter {
  #mainContainer = null;
  #filmsModel = null;
  #filmDetailsComponent = null;

  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #filmsListComponent = new FilmsListView();
  #showMoreButtonCompoment = new ShowMoreButtonView();
  #sortComponent = new SortView();
  #noFilmsComponent = new NoFilmsView();
  #filmsListHeaderComponent = new FilmsListHeaderView();

  #films = [];
  #renderedFilmCount = FILMS_COUNT_PER_STEP;

  constructor(mainContainer, filmsModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
  }

  init = () => {
    this.#films = [...this.#filmsModel.films];

    this.#renderFilmList();
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

  #renderFilmsList = () => {
    render(this.#filmsListComponent, this.#filmsListSectionComponent.element);
  };

  #renderShowMore = () => {
    render(this.#showMoreButtonCompoment, this.#mainContainer);
  };

  #renderFilmDetails = (film) => {
    this.#filmDetailsComponent = new FilmDetailsView(film);
    render(this.#filmDetailsComponent, this.#mainContainer);
  };

  #handleShowMoreButtonClick = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonCompoment.element.remove();
      this.#showMoreButtonCompoment.removeElement();
    }
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmView(film);

    const hideFilmDetails = () => {
      this.#filmDetailsComponent.element.remove();
      this.#filmDetailsComponent.removeElement();
      document.body.classList.remove(OVERFLOW_HIDDEN_CLASS);
    };

    const onEscKeyDown = (evt) => {
      if (isEscapeKey) {
        evt.preventDefault();
        hideFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const showFilmDetails = () => {
      const oldFilmDetailsElement = document.querySelector('.film-details');
      if (oldFilmDetailsElement) {
        oldFilmDetailsElement.remove();
      }

      this.#renderFilmDetails(film);

      this.#filmDetailsComponent.setCloseClickHandler(() => {
        hideFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      document.body.classList.add(OVERFLOW_HIDDEN_CLASS);
    };

    filmComponent.setOpenPopupClickHandler(() => {
      showFilmDetails();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmsListComponent.element);
  };

  #renderFilmList = () => {
    if (this.#films.length === 0) {
      this.#renderNoFilms();
    } else {
      this.#renderSort();
      this.#renderFilmsListContainer();
      this.#renderFilmsListSection();
      this.#renderFilmsListHeader();
      this.#renderFilmsList();

      for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#films[i]);
      }

      if (this.#films.length > FILMS_COUNT_PER_STEP) {
        this.#renderShowMore();

        this.#showMoreButtonCompoment.setClickHandler(this.#handleShowMoreButtonClick);
      }
    }
  };
}
