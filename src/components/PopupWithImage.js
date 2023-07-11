import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = document.querySelector('.popup__image-big');
    this._popupCardName = document.querySelector('.popup__image-text');
  }

  open (name, link) {
    this._popupImage.src = link;
    this._popupCardName.textContent = name;
    this._popupImage.alt = `Вид на ${this._name}.`;
    super.open();
  }
}