import { openPopup, closePopup } from "./modal"
import { popupAddCard } from "../index"

const elementBigImage = document.querySelector('.popup__image-big');
const elementBigText = document.querySelector('.popup__image-text');
const placesContainer = document.querySelector(".elements");
const cardNameInput = document.querySelector('#place');
const cardUrlInput = document.querySelector('#link');
const templateCards = document.querySelector('#place-card').content;
const popupImage = document.querySelector('#popup-image');

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
imageElement.addEventListener('click', function() {
    openPopup(popupImage)
    elementBigImage.src = link,
    elementBigImage.alt = name,
    elementBigText.textContent = name
});
  return itemCloneCard;
};
// add card
export function addCard(evt) {
  evt.preventDefault();
  const card = {
   name: cardNameInput.value,
   link: cardUrlInput.value
  }  
evt.target.reset(); 
renderCard(card);
closePopup(popupAddCard);
};


export function renderCard(card) { 
  const newCard = createCard(card.name, card.link);
  placesContainer.prepend(newCard)
};