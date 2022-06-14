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
      userName: '',
    };
  }

  update = (count) => {
    switch(true) {
      case (count === 0):
        this._state.userName = '';
        break;
      case (count >= 1 && count <= 10):
        this._state.userName = UserType.NOVICE;
        break;
      case (count >= 11 && count <= 20):
        this._state.userName = UserType.FAN;
        break;
      case (count >= 21):
        this._state.userName = UserType.MOVIE_BUFF;
        break;
      default:
        break;
    }

    this._state.filmCount = count;

    this.updateElement({
      filmCount: this._state.filmCount,
      userName: this._state.userName,
    });
  };

  _restoreHandlers = () => { };

  get template() {
    return createUserProfileTemplate(this._state.userName);
  }
}
