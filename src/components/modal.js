// const popupCloseButtons = document.querySelectorAll('.popup__button-cancel');
// const closeByEsc = (evt) => {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened');
//     closePopup(openedPopup); 
//   }
  
// };
// export function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener("keydown",  closeByEsc);
// }

// export function closePopup(popup) {
//     popup.classList.remove('popup_opened');
//     document.addEventListener("keydown",  closeByEsc);

// }

// popupCloseButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
//   document.addEventListener("click", (evt) => {
//     if (evt.target === popup) {
//       closePopup(popup);
//     }
//   });
// });