import Observable from '../framework/observable.js';
import {generateFilm} from '../mock/film';

export default class FilmsModel extends Observable {
  #films = Array.from({length: 11}, generateFilm);

  get films() {
    return this.#films;
  }
}
