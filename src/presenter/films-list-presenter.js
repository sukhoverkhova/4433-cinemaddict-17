import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListHeaderView from '../view/films-list-header-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmView from '../view/film-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';
import {isEscapeKey} from '../util.js';

export default class FilmListPresenter {
  #mainContainer = null;
  #filmsModel = null;

  #filmsListContainerComponent = new FilmsListContainerView();
  #filmsListSectionComponent = new FilmsListSectionView();
  #filmsListComponent = new FilmsListView();

  #films = [];

  init = (mainContainer, filmsModel) => {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#films = [...this.#filmsModel.films];

    render(new SortView(), this.#mainContainer);
    render(this.#filmsListContainerComponent, this.#mainContainer);
    render(this.#filmsListSectionComponent, this.#filmsListContainerComponent.element);

    render(new FilmsListHeaderView(), this.#filmsListSectionComponent.element);
    render(this.#filmsListComponent, this.#filmsListSectionComponent.element);

    for (let i = 0; i < this.#films.length; i++) {
      this.#renderFilm(this.#films[i]);
    }

    render(new ShowMoreButtonView(), this.#mainContainer);
  };

  #renderFilm = (film) => {
    const filmComponent = new FilmView(film);
    let filmDetailsComponent;

    const hideFilmDetails = () => {
      filmDetailsComponent.element.remove();
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
    };

    filmComponent.element.addEventListener('click', () => {
      showFilmDetails();
      document.addEventListener('keydown', onEscKeyDown);
    });

    render(filmComponent, this.#filmsListComponent.element);
  };
}
