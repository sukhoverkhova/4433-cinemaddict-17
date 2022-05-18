import {render} from '../framework/render.js';
import ShowMoreButtonView from '../view/show-more-button-view';
import FilmPresenter from './film-presenter';
import {FILMS_COUNT_PER_STEP} from '../const';

export default class ShowMorePresenter {
  #filmListContainer = null;
  #mainContainer = null;
  #showMoreButtonCompoment = null;

  #films = [];
  #renderedFilmCount = FILMS_COUNT_PER_STEP;

  constructor(filmListContainer, mainContainer, films) {
    this.#filmListContainer = filmListContainer;
    this.#mainContainer = mainContainer;
    this.#films = films;
  }

  init = () => {
    this.#showMoreButtonCompoment = new ShowMoreButtonView();

    render(this.#showMoreButtonCompoment, this.#mainContainer);
    this.#showMoreButtonCompoment.setClickHandler(this.#handleClick);
  };

  #renderFilm = (film) => {
    const filmPresenter = new FilmPresenter(this.#filmListContainer, this.#mainContainer);
    filmPresenter.init(film);
  };

  #showMoreFilms = () => {
    this.#films
      .slice(this.#renderedFilmCount, this.#renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => this.#renderFilm(film));

    this.#renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (this.#renderedFilmCount >= this.#films.length) {
      this.#showMoreButtonCompoment.element.remove();
      this.#showMoreButtonCompoment.removeElement();
    }
  };

  #handleClick = () => {
    this.#showMoreFilms();
  };
}
