import {render} from '../framework/render';
import UserProfileView from '../view/user-profile-view';

export default class UserProfilePresenter {
  #headerElement = null;
  #userProfileView = new UserProfileView();

  constructor(headerElement) {
    this.#headerElement = headerElement;
    render(this.#userProfileView, this.#headerElement);
  }

  init = (filmCount) => {
    this.#userProfileView.update(filmCount);
  };
}
