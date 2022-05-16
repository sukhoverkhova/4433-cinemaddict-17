import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmsListSectionTemplate = () => '<div class="films-list"></div>';

export default class FilmsListSectionView extends AbstractView {
  get template() {
    return createFilmsListSectionTemplate();
  }
}
