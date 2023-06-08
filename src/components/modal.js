const popupCloseButtons = document.querySelectorAll('.popup__button-cancel');

export function openPopup(popup) {
  popup.classList.add('popup_opened');
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
  document.addEventListener("keydown", function onEscPress(evt) {
    if (evt.key === 'Escape') {
      closePopup(popup);
      document.removeEventListener("keydown", onEscPress);     
    };
  });
  document.addEventListener("click", function onOverlayClick(evt) {
    if (evt.target === popup) {
      closePopup(popup);
      document.removeEventListener("click", onOverlayClick);
    }
  });
});