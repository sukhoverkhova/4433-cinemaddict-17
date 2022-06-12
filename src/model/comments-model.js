import Observable from '../framework/observable';
import {UpdateType} from '../const';

export default class CommentsModel extends Observable {
  #commentsApiService = null;
  #filmId = null;
  #comments = [];

  constructor(commentsApiService) {
    super();
    this.#commentsApiService = commentsApiService;
  }

  get comments() {
    return this.#comments;
  }

  init = async (id) => {
    this.#filmId = id;

    try {
      this.#comments = await this.#commentsApiService.comments(this.#filmId);
    } catch(err) {
      this.#comments = [];
    }

    this._notify(UpdateType.INIT);
  };
}
