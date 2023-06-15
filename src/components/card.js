import { openPopupImage, handleChangeLikeStatus, handleDeleteCard } from "../index";

export const isLiked = (likesArray, userId) => {
  return Boolean(
      likesArray.find((likeObj) => {
          return likeObj._id === userId;
      })
  );
};

export const updateLikeStatus = (itemCloneCard, likesArray, userId) => {
  const likeButton = itemCloneCard.querySelector(".element__like-button");
  const likesCounter = itemCloneCard.querySelector(".element__like-button-span");

  likesCounter.textContent = likesArray.length;

  if (isLiked(likesArray, userId)) {
      likeButton.classList.add("element__like-button_active");
  } else {
      likeButton.classList.remove("element__like-button_active");
  }
};

export const placesContainer = document.querySelector(".elements");
const templateCards = document.querySelector('#place-card').content;
function createCard(data, userId, handleChangeLikeStatus, handleDeleteCard) {
  const itemCloneCard = templateCards.querySelector('.element').cloneNode(true);
  const titleElement = itemCloneCard.querySelector('.element__title');
  const imageElement = itemCloneCard.querySelector('.element__image');
  const likeButton = itemCloneCard.querySelector('.element__like-button');
  const deleteButton = itemCloneCard.querySelector('.element__trash')
  titleElement.textContent = data.name; 
  imageElement.src = data.link,
  imageElement.alt = data.name;

  updateLikeStatus(itemCloneCard, data.likes, userId);

  if (data.owner._id !== userId) {
    deleteButton.remove();
  }

  likeButton.addEventListener("click", () => {
    handleChangeLikeStatus(data._id, likeButton.classList.contains("element__like-button_active"), itemCloneCard);
  });

  deleteButton.addEventListener('click', () => handleDeleteCard(data._id, itemCloneCard));
  imageElement.addEventListener('click', () => openPopupImage(data.name, data.link));
  return itemCloneCard;
};

export function removeCard(itemCloneCard) {
  itemCloneCard.remove();
};

export function renderCard(placesContainer, data, userId) { 
  const newCard = createCard(data, userId, handleChangeLikeStatus, handleDeleteCard);
  placesContainer.prepend(newCard)
};