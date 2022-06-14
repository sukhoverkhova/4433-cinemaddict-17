import AbstractView from '../framework/view/abstract-stateful-view';

const createFilmsListHeaderTemplate = (title) => `<h2 class="films-list__title">${title}</h2>`;

export default class FilmsListHeaderView extends AbstractView {
  #title = '';

  constructor(title = 'All movies. Upcoming') {
    super();
    this.#title = title;
  }

  get template() {
    return createFilmsListHeaderTemplate(this.#title);
  }
}
