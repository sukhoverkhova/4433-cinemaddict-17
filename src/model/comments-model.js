import Observable from '../framework/observable';
import FilmsModel from './films-model';
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

  async addComment(updateType, data) {
    const {film, newComment} = data;

    try {
      const response = await this.#commentsApiService.addComment(newComment, film.id);
      this.#comments = response.comments;

      const updatedFilm = {
        ...FilmsModel.adaptToClient(response.movie),
        commentList: this.#comments
      };

      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t add the comment');
    }
  }

  async deleteComment(updateType, data) {
    const {film, commentId} = data;

    try {
      await this.#commentsApiService.deleteComment(commentId);
      film.comments = film.comments.filter((comment) => comment !== commentId);
      film.commentList = film.commentList.filter((comment) => comment.id !== commentId);
      const updatedFilm = {...film};
      this._notify(updateType, updatedFilm);
    } catch (err) {
      throw new Error('Can\'t delete the comment');
    }
  }
}
