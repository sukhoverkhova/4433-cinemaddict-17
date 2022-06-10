import {render} from './framework/render';
import UserProfileView from './view/user-profile-view';
import FilmListPresenter from './presenter/film-list-presenter';
import FilterPresenter from './presenter/filter-presenter';
import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import FilmsApiService from './film-api-service';

const AUTHORIZATION = 'Basic fdhjfrtyyuiddd';
const END_POINT = 'https://17.ecmascript.pages.academy/cinemaddict';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();
const filmListWrapper = new FilmListPresenter(siteMainElement, filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

render(new UserProfileView(), siteHeaderElement);

filterPresenter.init();
filmListWrapper.init();
filmsModel.init();
