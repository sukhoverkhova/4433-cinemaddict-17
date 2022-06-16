import ApiService from './framework/api-service';
import {Method} from './const';

export default class CommentsApiService extends ApiService {
  comments = async (filmId) => (
    this._load({url: `comments/${filmId}`})
      .then(ApiService.parseResponse)
  );

  addComment = async (comment, filmId) => {
    const response = await this._load({
      url: `comments/${filmId}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    return await ApiService.parseResponse(response);
  };

  deleteComment = async (commentId) => (
    await this._load({
      url: `comments/${commentId}`,
      method: Method.DELETE,
    })
  );
}
