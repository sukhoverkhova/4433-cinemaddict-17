import {createElement} from '../render.js';

const createFilmsListSectionTemplate = () => '<div class="films-list"></div>';

export default class FilmsListSectionView {
  getTemplate() {
    return createFilmsListSectionTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
