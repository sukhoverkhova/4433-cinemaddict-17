import {render} from './framework/render';
import UserProfileView from './view/user-profile-view';
import FilmListPresenter from './presenter/film-list-presenter';
import FilterPresenter from './presenter/filter-presenter.js';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const filmListWrapper = new FilmListPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

render(new UserProfileView(), siteHeaderElement);

filterPresenter.init();
filmListWrapper.init();
