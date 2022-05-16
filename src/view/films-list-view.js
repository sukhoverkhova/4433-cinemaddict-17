import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmsListTemplate = () => '<div class="films-list__container"></div>';

export default class FilmsListView extends AbstractView {
  get template() {
    return createFilmsListTemplate();
  }
}
