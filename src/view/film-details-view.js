import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import {humanizeDate} from '../util';

const ACTIVE_CLASS = 'film-details__control-button--active';

const EMOJI_ARRAY = {
  SMILE: 'smile',
  SLEEPING: 'sleeping',
  PUKE: 'puke',
  ANGRY: 'angry'
};

const createFilmDetailsTemplate = (data) => {
  const filmInfo = data.filmInfo;
  const filmComments = data.comments;
  const userDetails = data.userDetails;
  const smileType = data.selectedEmojiType;

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
          <p class="film-details__comment-text">${comment.comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">2019/12/31 23:59</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
    }

    return commentsList;
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
                <td class="film-details__cell">1h 18m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">USA</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  <span class="film-details__genre">Drama</span>
                  <span class="film-details__genre">Film-Noir</span>
                  <span class="film-details__genre">Mystery</span>
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
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>

          <ul class="film-details__comments-list">
            ${showComments(filmComments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${smileType ? `<img src="images/emoji/${smileType}.png" width="55" height="55" alt="emoji-smile">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${smileType === EMOJI_ARRAY.SMILE ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${smileType === EMOJI_ARRAY.SLEEPING ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${smileType === EMOJI_ARRAY.PUKE ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${smileType === EMOJI_ARRAY.ANGRY ? 'checked' : false}>
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
  #favoriteButtonElement = null;
  #watchedButtonElement = null;
  #watchlistButtonElement = null;
  #closeButtonElement = null;

  constructor(film) {
    super();

    this._state = FilmDetailsView.parseFilmToState(film);
    this.#setInnerHandlers();
  }

  get template() {
    return createFilmDetailsTemplate(this._state);
  }

  _restoreHandlers = () => {
    t his.#setInnerHandlers();

    this.element.scrollTo(0, this._state.scrollPosition);
  };

  static parseFilmToState = (film) => ({...film,
    selectedEmojiType: null,
    scrollPosition: 0,
  });

  setCloseClickHandler = (callback) => {
    this._callback.closeClick = callback;
    this.#closeButtonElement = this.element.querySelector('.film-details__close-btn');
    this.#closeButtonElement.addEventListener('click', this.#closeClisk);
  };

  #closeClisk = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.#favoriteButtonElement = this.element.querySelector('.film-details__control-button--favorite');
    this.#favoriteButtonElement.addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.#watchedButtonElement = this.element.querySelector('.film-details__control-button--watched');
    this.#watchedButtonElement.addEventListener('click', this.#watchedClickHandler);
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  setWatchListClickHandler = (callback) => {
    this._callback.watchListClick = callback;
    this.#watchlistButtonElement = this.element.querySelector('.film-details__control-button--watchlist');
    this.#watchlistButtonElement.addEventListener('click', this.#watchListClick);
  };

  #watchListClick = (evt) => {
    evt.preventDefault();
    this._callback.watchListClick();
  };

  #getEmojiType = (type) => type.replace('emoji-', '');

  #selectEmojiHandler = (evt) => {
    evt.preventDefault();

    const emojiType = this.#getEmojiType(evt.target.getAttribute('id'));

    this.updateElement({
      scrollPosition: this.element.scrollTop,
      selectedEmojiType: emojiType ? emojiType : null,
    });
  };

  #setInnerHandlers = () => {
    const emojiItems = [...this.element.querySelectorAll('.film-details__emoji-item')];

    for (let i = 0; i < emojiItems.length; i++) {
      emojiItems[i].addEventListener('input', this.#selectEmojiHandler);
    }

    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closeClisk);
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchListClick);
  };

  reset = (film) => {
    this.updateElement(
      FilmDetailsView.parseFilmToState(film),
    );
  };
}
