import AbstractView from '../framework/view/abstract-stateful-view';

const createNoFilmsTemplate = () => '<h2 class="films-list__title">There are no movies in our database</h2> ';

export default class NoFilmsView extends AbstractView {
  get template() {
    return createNoFilmsTemplate();
  }
}
