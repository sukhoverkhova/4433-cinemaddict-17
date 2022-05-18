import {render} from './framework/render';
import MainNavigationView from './view/main-navigation-view';
import UserProfileView from './view/user-profile-view';
import FilmListPresenter from './presenter/films-list-presenter';
import FilmsModel from './model/films-model';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const filmListPresenter = new FilmListPresenter(siteMainElement, filmsModel);

render(new UserProfileView(), siteHeaderElement);
render(new MainNavigationView(), siteMainElement);

filmListPresenter.init();
