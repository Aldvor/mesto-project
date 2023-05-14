const popupEdit = document.querySelector('#popup-profile');
const popupEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelectorAll('.popup__button-cancel');
const popupAddButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('#popup-card');
const formElement = document.querySelector('#profile');
const itemTemplate = document.querySelector('#place-card').content;
const saveButton = document.querySelector('.popup__button-save');
const popupImage = document.querySelector('.popup__image');
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
const placesContainer = document.querySelector(".elements");
const placeTemplate = document.querySelector("#place-card").content;
const placeInfo = initialCards.map(function (item) {
  return {
    link: item.link,
    name: item.name
  };
});
function render() {
  placeInfo.forEach(renderCard);
}
function renderCard({ link, name }) {
  const placeElement = placeTemplate.cloneNode(true);
  placeElement.querySelector(".element__image").alt = name;
  placeElement.querySelector(".element__image").src = link;
  placeElement.querySelector('.element__title').textContent = name;
  placesContainer.append(placeElement);
}
render();
//добавленные карточки
function createCards(nameCardValue, linkCardValue) {
  const itemElement = itemTemplate.querySelector('.element').cloneNode(true);
  itemElement.querySelector('.element__image').src = linkCardValue;
  itemElement.querySelector('.element__image').alt = nameCardValue;
  itemElement.querySelector('.element__title').textContent = nameCardValue;
  itemElement.querySelector('.element__like').addEventListener('click', function(evt){
    evt.target.classList.toggle('element__like_active')
  });
  itemElement.querySelector('.element__trash').addEventListener('click', function(evt){
    evt.target.closest('.element').remove()
  });
  itemElement.querySelector('.element__image').addEventListener('click', function(evt){
    const imgSrc = evt.target.getAttribute('src');
    const nameNe = evt.target.alt;
    elementBigText.textContent = nameNe;
    elementBigImage.setAttribute('src', imgSrc)
    elementBigImage.setAttribute('alt', nameNe)
    popupImage.classList.add("popup_opened");
  })
  return itemElement;
}
//лайки
const likeItem = document.querySelectorAll('.element__like');
likeItem.forEach(function(el) {
  el.addEventListener('click', function(evt) {
      evt.target.classList.toggle('element__like_active');
  });
});
const deleteItem = document.querySelectorAll('.element__trash');
deleteItem.forEach(function(el) {
  el.addEventListener('click', function(evt) {
    evt.target.closest('.element').remove()
  });
});
const nameMesto = document.querySelector('#place')
const linkMesto = document.querySelector('#link')
//добавление карточки
function addCards(evt) {
  evt.preventDefault(); 
  placesContainer.prepend(createCards(nameMesto.value, linkMesto.value)); 
  popupAddCard.classList.remove('popup_opened');
  nameMesto.value = '';
  linkMesto.value = '';
}
formAddCard.addEventListener('submit', addCards); 

//открытие модального окна профиля
popupEditButton.addEventListener('click', function () {
  popupEdit.classList.add('popup_opened');
});
// открытие модального окна добавления карточек
popupAddButton.addEventListener('click', function () {
  popupAddCard.classList.add('popup_opened');
});
// закрытие модальных окон
for (let i = 0; i < popupCloseButton.length; i++){
  const closeButton = popupCloseButton[i];
  closeButton.addEventListener('click', function () {
  popupEdit.classList.remove('popup_opened');
  popupAddCard.classList.remove('popup_opened');
  popupImage.classList.remove('popup_opened');
})
};
//функция редактирования профиля
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('#heading');
const jobInput = document.querySelector('#subheading');
function formSubmitHandler (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value
  profileSubtitle.textContent = jobInput.value
  popupEdit.classList.remove('popup_opened');
}
formElement.addEventListener('submit', formSubmitHandler);
//открытие большой картинки
const elementBigImage = document.querySelector('.popup__image-big');
const elementBigText = document.querySelector('.popup__image-text');
const bigImages = document.querySelectorAll('.element__image')
  bigImages.forEach(function(initialCards) {
    initialCards.addEventListener('click', function(evt) {
      const imgSrc = evt.target.getAttribute('src');
      const nameMe = evt.target.alt;
      elementBigText.textContent = nameMe;
      elementBigImage.setAttribute('src', imgSrc)
      elementBigImage.setAttribute('alt', nameMe)
      popupImage.classList.add('popup_opened');
    });
});
