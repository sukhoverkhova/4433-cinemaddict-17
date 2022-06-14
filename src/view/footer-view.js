import AbstractView from '../framework/view/abstract-stateful-view';

const createFooterTemplate = (count = 0) => (
  `<footer class="footer">
      <section class="footer__logo logo logo--smaller">Cinemaddict</section>
      <section class="footer__statistics">
        ${count}
      </section>
    </footer>`
);

export default class FooterView extends AbstractView {
  constructor(count = 0) {
    super();

    this._state = {
      filmCount: count,
    };
  }

  update = (count) => {
    this._state.filmCount = count;

    this.updateElement({
      filmCount: this._state.filmCount,
      userName: this._state.userName,
    });
  };

  _restoreHandlers = () => { };

  get template() {
    return createFooterTemplate(this._state.filmCount);
  }
}
