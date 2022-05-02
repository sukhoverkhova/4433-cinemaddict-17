import FilmsListContainerView from '../view/films-list-container-view.js';
import FilmsListSectionView from '../view/films-list-section-view.js';
import FilmsListHeaderView from '../view/films-list-header-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmView from '../view/film-view.js';
import FilmDetailsView from '../view/film-details-view.js';
import SortView from '../view/sort-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import {render} from '../render.js';

export default class FilmListPresenter {
  filmsListContainerComponent = new FilmsListContainerView();
  filmsListSectionComponent = new FilmsListSectionView();
  filmsListComponent = new FilmsListView();

  init = (mainContainer, filmsModel) => {
    this.mainContainer = mainContainer;
    this.filmsModel = filmsModel;
    this.films = [...this.filmsModel.getFilms()];

    render(new SortView(), this.mainContainer);
    render(this.filmsListContainerComponent, this.mainContainer);
    render(this.filmsListSectionComponent, this.filmsListContainerComponent.getElement());

    render(new FilmsListHeaderView(), this.filmsListSectionComponent.getElement());
    render(this.filmsListComponent, this.filmsListSectionComponent.getElement());

    for (let i = 0; i < this.films.length; i++) {
      const filmView = new FilmView(this.films[i]);
      render(filmView, this.filmsListComponent.getElement());
    }

    render(new ShowMoreButtonView(), this.mainContainer);
    // render(new FilmDetailsView(), this.mainContainer);
  };
}
