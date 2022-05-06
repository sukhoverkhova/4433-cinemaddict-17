import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListHeaderView from '../view/films-list-header-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmView from '../view/film-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import NoFilmsView from '../view/no-films-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';

import {render} from '../render.js';
import {isEscapeKey} from '../util.js';
import {OVERFLOW_HIDDEN_CLASS, FILMS_COUNT_PER_STEP} from '../const.js';

export default class FilmListPresenter {
  #mainContainer = null;
  #filmsModel = null;

  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #filmsListComponent = new FilmsListView();
  #showMoreButtonCompoment = new ShowMoreButtonView();

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

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();

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
    let filmDetailsComponent;

    const hideFilmDetails = () => {
      filmDetailsComponent.element.remove();
      filmDetailsComponent.removeElement();
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

      filmDetailsComponent = new FilmDetailsView(film);
      render(filmDetailsComponent, this.#mainContainer);

      filmDetailsComponent.element.querySelector('.film-details__close-btn').addEventListener('click', () => {
        hideFilmDetails();
        document.removeEventListener('keydown', onEscKeyDown);
      });

      document.body.classList.add(OVERFLOW_HIDDEN_CLASS);
    };

    filmComponent.element.addEventListener('click', () => {
      showFilmDetails();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmsListComponent.element);
  };

  #renderFilmList = () => {
    if (this.#films.length === 0) {
      render(new NoFilmsView(), this.#mainContainer);
    } else {
      render(new SortView(), this.#mainContainer);
      render(this.#filmsListContainerComponent, this.#mainContainer);
      render(this.#filmsListSectionComponent, this.#filmsListContainerComponent.element);

      render(new FilmsListHeaderView(), this.#filmsListSectionComponent.element);
      render(this.#filmsListComponent, this.#filmsListSectionComponent.element);

      for (let i = 0; i < Math.min(this.#films.length, FILMS_COUNT_PER_STEP); i++) {
        this.#renderFilm(this.#films[i]);
      }

      if (this.#films.length > FILMS_COUNT_PER_STEP) {
        render(this.#showMoreButtonCompoment, this.#mainContainer);

        this.#showMoreButtonCompoment.element.addEventListener('click', this.#handleShowMoreButtonClick);
      }
    }
  };
}
