import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmsListTemplate = () => (
  `<section class="films">
    <section class="films-list" id='film-list-container'>
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="films-list__container" id='all-films'></div>
    </section>
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
      <div class="films-list__container" id='top-rated-films'></div>
    </section>
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container" id='most-commented-films'></div>
    </section>
  </section>`
);

export default class FilmsListView extends AbstractView {
  get template() {
    return createFilmsListTemplate();
  }

  getAllMoviesElement = () => this.element.querySelector('#all-films');

  getTopRatedMoviesElement = () => this.element.querySelector('#top-rated-films');

  getMostCommentedElement = () => this.element.querySelector('#most-commented-films');

  getContainerElement = () => this.element.querySelector('#film-list-container');
}
