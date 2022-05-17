import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmListContainerTemplate = () => '<section class="films"></section>';

export default class FilmsListContainerView extends AbstractView {
  get template() {
    return createFilmListContainerTemplate();
  }
}
