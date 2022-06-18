import Observable from '../framework/observable';
import {FilterType} from '../const';

export default class FilterModel extends Observable {
  #filterType = FilterType.ALL;

  get filterType() {
    return this.#filterType;
  }

  setFilter = (updateType, filterType) => {
    this.#filterType = filterType;
    this._notify(updateType, filterType);
  };
}
