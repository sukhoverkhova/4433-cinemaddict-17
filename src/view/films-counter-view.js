import {createElement} from '../render.js';

const createFilmsCounterTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsCounterView {
  getTemplate() {
    return createFilmsCounterTemplate();
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
