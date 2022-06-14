import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmsListSectionTemplate = (elementClass) => `<div class="films-list ${elementClass}"></div>`;

export default class FilmsListSectionView extends AbstractView {
  #elementClass = '';

  constructor(elementClass = '') {
    super();
    this.#elementClass = elementClass;
  }

  get template() {
    return createFilmsListSectionTemplate(this.#elementClass);
  }
}
