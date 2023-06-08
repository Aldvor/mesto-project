import './pages/index.css'
import { enableValidation } from './components/validate';
import { openPopup, closePopup } from './components/modal';
import { renderCard, addCard } from './components/card';
import { initialCards } from './components/utils';

const popupEdit = document.querySelector('#popup-profile');
export const popupAddCard = document.querySelector('#popup-card');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('#mesto');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('#profile');
const nameInput = document.querySelector('#heading');
const jobInput = document.querySelector('#subheading');

popupEditButton.addEventListener('click', function () {
    openPopup(popupEdit);
});
popupAddButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value 
    closePopup(popupEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

formAddCard.addEventListener('submit', addCard);

initialCards.reverse().forEach((card) => {
  renderCard(card)
});

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__item-error',
  errorClass: 'popup__item-error_active'
}

enableValidation(settings)