export default class Section {
  constructor ({ renderer }) {
    this._renderer = renderer;
    this._container = document.querySelector('.elements');
  }

  renderItems(data) {
    data.reverse().forEach(item => this._renderer(item));
  }

  addItem(el) {
    this._container.prepend(el);
  }
}