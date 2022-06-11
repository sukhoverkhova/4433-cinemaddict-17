import {render} from './framework/render';
import UserProfileView from './view/user-profile-view';
import FilmListPresenter from './presenter/film-list-presenter';
import FilterPresenter from './presenter/filter-presenter';

import FilmsModel from './model/films-model';
import FilterModel from './model/filter-model';
import CommentsModel from './model/comments-model.js';

import FilmsApiService from './film-api-service';
import CommentsApiService from './comments-api-service';
import {AUTHORIZATION, END_POINT} from './const';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const filmsModel = new FilmsModel(new FilmsApiService(END_POINT, AUTHORIZATION));
const commentsModel = new CommentsModel(new CommentsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const filmListWrapper = new FilmListPresenter(siteMainElement, filmsModel, filterModel, commentsModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);

render(new UserProfileView(), siteHeaderElement);

filterPresenter.init();
filmListWrapper.init();
filmsModel.init();
