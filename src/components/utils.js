export function disableButton(buttonElement) {
  buttonElement.classList.add('popup__button-save_inactive');
  buttonElement.disabled = true;
};

export function setStatusOnButton ({buttonElement, text, disabled}) {
  if (disabled) {
    buttonElement.disabled = 'disabled'
  } else {
    buttonElement.disabled = false;
  }
  buttonElement.textContent = text;
}