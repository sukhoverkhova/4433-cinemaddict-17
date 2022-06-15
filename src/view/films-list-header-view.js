import AbstractView from '../framework/view/abstract-stateful-view';
import {headerType} from '../const';

const createFilmsListHeaderTemplate = (type) => `<h2 class="films-list__title ${type === 'DEFAULT' ? 'visually-hidden' : ''}">${headerType[type]}</h2>`;

export default class FilmsListHeaderView extends AbstractView {
  #type = '';

  constructor(type) {
    super();
    this.#type = type;
  }

  get template() {
    return createFilmsListHeaderTemplate(this.#type);
  }
}
