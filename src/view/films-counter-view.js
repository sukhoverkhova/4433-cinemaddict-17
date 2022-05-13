import {createElement} from '../render';

const createFilmsCounterTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsCounterView {
  #element = null;

  get template() {
    return createFilmsCounterTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
