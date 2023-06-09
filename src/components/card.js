import { openPopupImage } from "../index"

const placesContainer = document.querySelector(".elements");
const templateCards = document.querySelector('#place-card').content;
export function createCard(name, link) {
  const itemCloneCard = templateCards.cloneNode(true);
  const titleElement = itemCloneCard.querySelector('.element__title');
  const imageElement = itemCloneCard.querySelector('.element__image');
  titleElement.textContent = name; 
  imageElement.src = link,
  imageElement.alt = name;
  itemCloneCard.querySelector('.element__like').addEventListener('click', activeLikeBtn);
  itemCloneCard.querySelector('.element__trash').addEventListener('click', closestElement);
  imageElement.addEventListener('click', () => openPopupImage(name, link));
  return itemCloneCard;
};
export function renderCard(data) { 
  const newCard = createCard(data.name, data.link);
  placesContainer.prepend(newCard)
};

function activeLikeBtn (evt) { 
  evt.target.classList.toggle('element__like_active')
};

function closestElement(evt)  { 
  evt.target.closest('.element').remove() 
}