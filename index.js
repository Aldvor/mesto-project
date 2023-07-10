import './index.css'
import FormValidator from '../components/FormValidator';
import { openPopup, closePopup } from '../components/modal';
import { renderCard, placesContainer, removeCard, updateLikeStatus } from '../components/card';
import { disableButton, setStatusOnButton } from '../components/utils';
import { data } from 'autoprefixer';
import { getInfo, getNewCard, editUserProfile, editAvatar, deleteCard, changeLikeStatus } from '../components/api'

const popupEdit = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-card');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const formAddCard = document.querySelector('#mesto');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('#profile');
const nameInput = document.querySelector('#heading');
const jobInput = document.querySelector('#subheading');
const popupImage = document.querySelector('#popup-image');
const elementBigImage = document.querySelector('.popup__image-big');
const elementBigText = document.querySelector('.popup__image-text');
const cardNameInput = document.querySelector('#place');
const cardUrlInput = document.querySelector('#link');
const cardSaveButton = document.querySelector('#button-add-card');
const popupAvatar = document.querySelector('#popup-avatar');
const profileAvatar = document.querySelector('.profile__avatar')
const popupEditAvatar = document.querySelector('.profile__avatar-button');
const avatarLink = document.querySelector('#link-avatar');
const avatarSubmitButton = document.querySelector('#avatar-submit');
const editSubmitButton = document.querySelector('#button-edit')

popupEditAvatar.addEventListener('click', () => {
    openPopup(popupAvatar);
})

function avatarSubmit(evt) {
  evt.preventDefault();
  setStatusOnButton({ buttonElement: avatarSubmitButton, text: 'Сохранение...', disabled: false });
  editAvatar({
      avatar: avatarLink.value
  }).then((data) => {
      profileAvatar.src = data.avatar;
      evt.target.reset();
      closePopup(popupAvatar);    
  }).catch((err) => {
      console.log(err);
  }).finally(() => {
    setStatusOnButton({ buttonElement: avatarSubmitButton, text: 'Сохранить', disabled: false })
  })
};

popupAvatar.addEventListener('submit', avatarSubmit);

popupEditButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  setStatusOnButton({ buttonElement: editSubmitButton, text: 'Сохранение...', disabled: false })
  editUserProfile({
    name: nameInput.value,
    about: jobInput.value
  }).then((data) => {
    profileTitle.textContent = data.name;
    profileSubtitle.textContent = data.about;
    closePopup(popupEdit);
  })
  .catch((err) => {
    console.log(err);
  }).finally(() => {
    setStatusOnButton({ buttonElement: editSubmitButton, text: 'Сохранить', disabled: false })
  }) 
}

profileForm.addEventListener('submit', handleProfileFormSubmit);

popupAddButton.addEventListener('click', () => {
  disableButton(cardSaveButton);
  openPopup(popupAddCard);
});

function addCard(evt) {
  evt.preventDefault();
  setStatusOnButton({ buttonElement: cardSaveButton, text: 'Сохранение...', disabled: false })
  getNewCard({
   name: cardNameInput.value,
   link: cardUrlInput.value
  }).then((dataFromServer) => {
    renderCard(placesContainer, dataFromServer, userId);
    evt.target.reset(); 
    closePopup(popupAddCard);
  }).catch((err) => {
    console.log(err);
  }).finally(() => {
    setStatusOnButton({ buttonElement: cardSaveButton, text: 'Сохранить', disabled: false })
  })
};

formAddCard.addEventListener('submit', addCard);

let userId = null;

getInfo()
.then(([user, InitialCards]) => {
  profileTitle.textContent = user.name;
  profileSubtitle.textContent = user.about;
  profileAvatar.src = user.avatar;
  userId = user._id;

  InitialCards.reverse().forEach((data) => {
    renderCard(placesContainer, data, userId);
  });
})
.catch((err) => {
  console.log(err)
})

export const openPopupImage = (name, link) => {
    openPopup(popupImage);
    elementBigImage.src = link,
    elementBigImage.alt = name,
    elementBigText.textContent = name
}

export const handleChangeLikeStatus = (cardId, isLiked, newCard) => {
  changeLikeStatus(cardId, isLiked)
  .then((dataFromServer) => {
      updateLikeStatus(newCard, dataFromServer.likes, userId);
  }).catch((err) => {
      console.log(err);
  });
};

export function handleDeleteCard(cardId, newCard) {
  deleteCard(cardId).then(() => {
    removeCard(newCard);
  })
  .catch((err) => {
    console.log(err)
  })
};

const settings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_inactive',
  inputErrorClass: 'popup__item-error',
  errorClass: 'popup__item-error_active'
}

enablevalidation(settings);