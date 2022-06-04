import {render} from './framework/render';
import FilterView from './view/filter-view';
import UserProfileView from './view/user-profile-view';
import FilmListPresenter from './presenter/film-list-presenter';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model.js';

const filters = [
  {
    type: 'all',
    name: 'All Movies',
    count: 0,
  },
];

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const filmListWrapper = new FilmListPresenter(siteMainElement, filmsModel);

render(new UserProfileView(), siteHeaderElement);
render(new FilterView(filters, 'all'), siteMainElement);

filmListWrapper.init();
