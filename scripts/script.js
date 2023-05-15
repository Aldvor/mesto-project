//переменные
const popupEdit = document.querySelector('#popup-profile');
const popupAddCard = document.querySelector('#popup-card');
const popupImage = document.querySelector('#popup-image');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupAddButton = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__button-cancel');
const elementBigImage = document.querySelector('.popup__image-big');
const elementBigText = document.querySelector('.popup__image-text');
const placesContainer = document.querySelector(".elements");
//слушатели открытия popup
popupEditButton.addEventListener('click', function () {
    openPopup(popupEdit);
});
popupAddButton.addEventListener('click', function () {
    openPopup(popupAddCard);
});
//функции открытия popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}
//функции закрытия popup
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
//редактирование профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const profileForm = document.querySelector('#profile');
const nameInput = document.querySelector('#heading');
const jobInput = document.querySelector('#subheading');
const formAddCard = document.querySelector('#mesto');
function handleProfileFormSubmit (evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value 
  closePopup(popupEdit);
}
profileForm.addEventListener('submit', handleProfileFormSubmit);
//массив карточек "из коробки"
const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
//create card
const cardNameInput = document.querySelector('#place');
const cardUrlInput = document.querySelector('#link');
const templateCards = document.querySelector('#place-card').content;
function createCard(name, link) {
  const itemCloneCard = templateCards.cloneNode(true);
  const titleElement = itemCloneCard.querySelector('.element__title');
  const imageElement = itemCloneCard.querySelector('.element__image');
  titleElement.textContent = name; 
  imageElement.src = link,
  imageElement.alt = name;
//like
itemCloneCard.querySelector('.element__like').addEventListener('click', function(evt){ 
  evt.target.classList.toggle('element__like_active');
})
//delete
itemCloneCard.querySelector('.element__trash').addEventListener('click', function(evt) {
    evt.target.closest('.element').remove()
});
//слушатель картинок
imageElement.addEventListener('click', function(){
    openPopup(popupImage)
    elementBigImage.src = link,
    elementBigImage.alt = name,
    elementBigText.textContent = name
});
  return itemCloneCard;
};
// add card
function addCard(evt) {
  evt.preventDefault();
  const card = {
    name: cardNameInput.value,
    link: cardUrlInput.value
}
//reset input 
  evt.target.reset(); 
  renderCard(card);
  closePopup(popupAddCard);
  };

function renderCard(card) { 
  const newCard = createCard(card.name, card.link);
  placesContainer.prepend(newCard)
};

initialCards.reverse().forEach((card) => {
  renderCard(card)
});
formAddCard.addEventListener('submit', addCard); 