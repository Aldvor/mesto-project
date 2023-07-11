import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__item');
    this._submitButton = this._form.querySelector('.popup__button-save');
    this._submitButtonText = this._submitButton.textContent;
    this._submitForm = this._submitForm.bind(this);
  }

  _getInputValues()  {
    this._values = {};
    this._inputList.forEach(item => {
      this._values[item.name] = item.value;
    })
    return this._values;
  }

  _submitForm(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
}


  _setEventListeners() {
    super._setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  _removeEventListeners() {
    super._removeEventListeners();
    this._form.removeEventListener('submit', this._submitForm);
  }

close() {
  super.close();
  this._form.reset();
}

renderLoading(request, loadingText='Сохранение...') {
    if (request) {
    this._submitButton.textContent = loadingText;
    } else {
    this._submitButton.textContent = this._submitButtonText;
    }
  }
}