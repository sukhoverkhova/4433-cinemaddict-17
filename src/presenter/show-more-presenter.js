import {render, remove} from '../framework/render';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmPresenter from './film-presenter';
import {FILMS_COUNT_PER_STEP} from '../const';

export default class ShowMorePresenter {
  #filmListContainer = null;
  #mainContainer = null;
  #showMoreButtonComponent = null;
  #changeData = null;
  #filmPresenter = null;
  #getRenderedFilmsCount = null;

  #films = [];
  #renderedFilmCount = FILMS_COUNT_PER_STEP;

  constructor(filmListContainer, mainContainer, films, changeData, filmPresenter, getRenderedFilmsCount) {
    this.#filmListContainer = filmListContainer;
    this.#mainContainer = mainContainer;
    this.#films = films;
    this.#changeData = changeData;
    this.#filmPresenter = filmPresenter;
    this.#getRenderedFilmsCount = getRenderedFilmsCount;
  }

  init = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();

    render(this.#showMoreButtonComponent, this.#mainContainer);
    this.#showMoreButtonComponent.setClickHandler(this.#clickHandler);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainer, this.#mainContainer, this.#changeData);
    filmPresenter.init(film);
    this.#filmPresenter.set(film.id, filmPresenter);
  };

  destroy = () => {
    this.#renderedFilmCount = FILMS_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #showMoreFilms = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILMS_COUNT_PER_STEP;

    this.#getRenderedFilmsCount(this.#renderedFilmCount);

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #clickHandler = () => {
    this.#showMoreFilms();
  };
}
