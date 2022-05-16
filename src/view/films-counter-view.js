import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmsCounterTemplate = () => '<p>130 291 movies inside</p>';

export default class FilmsCounterView extends AbstractView {
  get template() {
    return createFilmsCounterTemplate();
  }
}
