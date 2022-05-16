import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmsListHeaderTemplate = () => '<h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>';

export default class FilmsListHeaderView extends AbstractView {
  get template() {
    return createFilmsListHeaderTemplate();
  }
}
