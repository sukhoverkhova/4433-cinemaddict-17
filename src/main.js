import MainNavigationView from './view/main-navigation-view.js';
import UserProfileView from './view/user-profile-view.js';
import FilmListPresenter from './presenter/films-list-presenter.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const filmListPresenter = new FilmListPresenter();

render(new UserProfileView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement);

filmListPresenter.init(siteMainElement);
