import AbstractView from '../framework/view/abstract-stateful-view';

const UserType = {
  NOVICE: 'novice',
  FAN: 'fan',
  MOVIE_BUFF: 'movie buff',
};

const createUserProfileTemplate = (userName) => (
  `<section class="header__profile profile">
    ${(userName !== null) ? `<p class="profile__rating">${userName}</p>` : ''}
    ${(userName !== null) ? '<img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">' : ''}
  </section>`
);

export default class UserProfileView extends AbstractView {
  constructor(count) {
    super();

    this._state = {
      filmCount: count,
      userName: null,
    };
  }

  get template() {
    return createUserProfileTemplate(this._state.userName);
  }

  update = (count) => {
    this._state.userName = this.#getUserName(count);
    this._state.filmCount = count;

    this.updateElement({
      filmCount: this._state.filmCount,
      userName: this._state.userName,
    });
  };

  _restoreHandlers = () => { };

  #getUserName = (count) => {
    if (count >= 1 && count <= 10) {
      return UserType.NOVICE;
    }

    if (count >= 11 && count <= 20) {
      return UserType.FAN;
    }

    if (count >= 21) {
      return UserType.MOVIE_BUFF;
    }

    return null;
  };
}
