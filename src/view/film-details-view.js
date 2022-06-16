import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizeDate, minutesToHours} from '../util';
import he from 'he';

const ACTIVE_CLASS = 'film-details__control-button--active';

const EMOJIS = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry'
};

const createFilmDetailsTemplate = (data) => {
  const {filmInfo, commentList, userDetails, isDeleting, commentToDelete, isSaving} = data;

  const smileType = data.newComment.emotion;
  const commentText = data.newComment.comment;

  const getActiveCLassElement = (flag) => {
    const elementClass = flag ? ACTIVE_CLASS : '';
    return elementClass;
  };

  const showComments = (comments) => {
    let commentsList = '';

    for (const comment of comments) {
      commentsList += `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(String(comment.comment))}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${humanizeDate(comment.date, 'D MMMM YYYY HH:MM')}</span>
            <button
              class="film-details__comment-delete"
              data-buttonId="${comment.id}"
              ${isDeleting && commentToDelete === comment.id ? 'disabled' : ''}
              >
              ${isDeleting && commentToDelete === comment.id ? 'Deleting...' : 'Delete'}
              </button>
          </p>
        </div>
      </li>`;
    }

    return commentsList;
  };

  const showGenres = (genres) => {
    let genresList = '';

    for(const genre of genres) {
      genresList += `<span class="film-details__genre">${genre}</span>`;
    }

    return genresList;
  };

  return (
    `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="">

            <p class="film-details__age">${filmInfo.ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${humanizeDate(filmInfo.release.date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${minutesToHours(filmInfo.runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${filmInfo.genre.length > 1 ? 'Genres' : 'Genre'}</td>
                <td class="film-details__cell">
                  ${showGenres(filmInfo.genre)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getActiveCLassElement(userDetails.watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${getActiveCLassElement(userDetails.alreadyWatched)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${getActiveCLassElement(userDetails.favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentList.length}</span></h3>

          <ul class="film-details__comments-list">
            ${showComments(commentList)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${smileType ? `<img src="images/emoji/${smileType}.png" width="55" height="55" alt="emoji-smile">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea
                class="film-details__comment-input"
                placeholder="Select reaction below and write comment here"
                name="comment"
                ${isSaving ? 'disabled' : ''}>${commentText ? commentText : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${smileType === EMOJIS.SMILE ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${smileType === EMOJIS.SLEEPING ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${smileType === EMOJIS.PUKE ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${smileType === EMOJIS.ANGRY ? 'checked' : false}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`
  );
};

export default class FilmDetailsView extends AbstractStatefulView {
  constructor(film) {
    super();

    this._state = FilmDetailsView.parseFilmToState(film);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();

    this.element.scrollTo(0, this._state.scrollPosition);
  };

  updateFilm = (film) => {
    this.updateElement({
      ...film,
      scrollPosition: this.element.scrollTop,
      newComment: {
        comment: this._state.newComment.text ? this._state.newComment.text : '',
        emotion: this._state.newComment.emotion ? this._state.newComment.emotion : '',
      },
      isSaving: this._state.isSaving ? !this._state.isSaving : this._state.isSaving,
      isDeleting: this._state.isDeleting ? !this._state.isDeleting : this._state.isDeleting,
      commentToDelete: this._state.commentToDelete,
    });
  };

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', this.#closeClickHandler);
  };

  #closeClickHandler = (evt) => {
    evt.preventDefault();
    document.removeEventListener('keydown', this.#addCommentHandler);
    this._callback.closeClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.favorite = !this._state.userDetails.favorite;

    const updatedFilm = {...this._state};
    this._callback.watchListClick(updatedFilm);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedButtonClickHandler);
  };

  #watchedButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.alreadyWatched = !this._state.userDetails.alreadyWatched;

    const updatedFilm = {...this._state};
    this._callback.watchedClick(updatedFilm);
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClickHandler);
  };

  #watchListClickHandler = (evt) => {
    evt.preventDefault();
    this._state.userDetails.watchlist = !this._state.userDetails.watchlist;

    const updatedFilm = {...this._state};
    this._callback.watchListClick(updatedFilm);
  };

  #getEmojiType = (type) => type.replace('emoji-', '');

  #selectEmojiHandler = (evt) => {
    evt.preventDefault();

    const emojiType = this.#getEmojiType(evt.target.getAttribute('id'));

    this.updateElement({
      scrollPosition: this.element.scrollTop,
      newComment: {
        comment: this._state.newComment.comment,
        emotion: emojiType ? emojiType : null,
      }
    });
  };

  #commentInputHandler = (evt) => {
    evt.preventDefault();

    this._setState({
      newComment: {
        comment: evt.target.value,
        emotion: this._state.newComment.emotion,
      }
    });
  };

  setAddCommentHandler = (callback) => {
    this._callback.addComment = callback;
    document.addEventListener('keydown', this.#addCommentHandler);
  };

  #addCommentHandler = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      evt.preventDefault();

      const newComment = {
        comment: this._state.newComment.comment,
        emotion: this._state.newComment.emotion,
      };

      this.updateElement({
        scrollPosition: this.element.scrollTop,
        newComment: {
          comment: '',
          emotion: null,
        }
      });

      this._callback.addComment({film: this._state, newComment: newComment});
    }
  };

  setDeleteCommentHandler = (callback) => {
    this._callback.deleteComment = callback;

    const deleteButtonElements = this.element.querySelectorAll('.film-details__comment-delete');

    deleteButtonElements.forEach((button) => {
      button.addEventListener('click', this.#commentDeleteClickHandler);
    });
  };

  #commentDeleteClickHandler = (evt) => {
    evt.preventDefault();
    const commentId = evt.target.dataset.buttonid;
    this._state.commentToDelete = commentId;
    this._state.scrollPosition = this.element.scrollTop;

    this._callback.deleteComment({film: this._state, commentId});
  };

  #setInnerHandlers = () => {
    const emojiItems = [...this.element.querySelectorAll('.film-details__emoji-item')];

    for (let i = 0; i < emojiItems.length; i++) {
      emojiItems[i].addEventListener('input', this.#selectEmojiHandler);
    }

    const deleteButtonElements = this.element.querySelectorAll('.film-details__comment-delete');

    deleteButtonElements.forEach((button) => {
      button.addEventListener('click', this.#commentDeleteClickHandler);
    });

    this.setCloseClickHandler(this._callback.closeClick);

    this.element.querySelector('.film-details__control-button--favorite')
      .addEventListener('click', this.#favoriteClickHandler);

    this.element.querySelector('.film-details__control-button--watched')
      .addEventListener('click', this.#watchedButtonClickHandler);

    this.element.querySelector('.film-details__control-button--watchlist')
      .addEventListener('click', this.#watchListClickHandler);

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);
  };

  static parseFilmToState = (film) => ({...film,
    scrollPosition: 0,
    newComment: {
      comment: null,
      emotion: null,
    },
    isSaving: false,
    isDeleting: false,
    commentToDelete: null,
  });

  reset = (film) => {
    this.updateElement(
      FilmDetailsView.parseFilmToState(film),
    );
  };
}
