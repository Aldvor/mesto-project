export default class FormValidator {
  constructor(settings) {
    this.settings = settings;
  }

  checkInputValidity(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
      inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
      inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
      this.showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this.hideInputError(formElement, inputElement);
    }
  }

  showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.settings.errorClass);
  }

  hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(this.settings.errorClass);
    errorElement.textContent = '';
  }

  toggleButtonState(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(this.settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(this.settings.inactiveButtonClass);
    }
  }

  setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this.settings.inputSelector));
    const buttonElement = formElement.querySelector(this.settings.submitButtonSelector);
    this.toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this.checkInputValidity(formElement, inputElement);
        this.toggleButtonState(inputList, buttonElement);
      });
    });
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  enableValidation() {
    const formList = Array.from(document.querySelectorAll(this.settings.formSelector));

    formList.forEach((formElement) => {
      this.formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
      });

      this.setEventListeners(formElement);
    });
  }
}
