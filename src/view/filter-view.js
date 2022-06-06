import AbstractView from '../framework/view/abstract-stateful-view';

const createFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return (
    `<a
    href="#${type}"
    class="main-navigation__item
    ${type === currentFilterType ? 'main-navigation__item--active' : ''}"
    data-filterType="${type}">
      ${name} <span class="main-navigation__item-count">${count}</span>
    </a>
    `
  );
};

const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType))
    .join('');

  return (
    `<nav class="main-navigation">
      ${filterItemsTemplate}
    </nav>`
  );
};


export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilter = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilter = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilter);
  }

  setFilterTypeClickHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeClickHandler);
  };

  #filterTypeClickHandler = (evt) => {
    evt.preventDefault();

    const navClassList = evt.target.classList;

    if (navClassList.contains('main-navigation__item-count')) {
      this._callback.filterTypeChange(evt.target.parentNode.dataset.filtertype);
      return;
    }

    if (navClassList.contains('main-navigation__item')) {
      this._callback.filterTypeChange(evt.target.dataset.filtertype);
    }
  };
}
