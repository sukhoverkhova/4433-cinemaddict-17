import AbstractView from '../framework/view/abstract-stateful-view';

const createNoTaskTemplate = () => ('<h2 class="films-list__title">Loading...</h2>');

export default class LoadingView extends AbstractView {
  get template() {
    return createNoTaskTemplate();
  }
}
