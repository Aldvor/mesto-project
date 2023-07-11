export default class Card {
  constructor({ data, selector, userId, setHeart, removeHeart, confirmCardDelete, handleCardClick }) {
    this._userId = userId;
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._ownerId = data.owner._id; 
    this._selector = selector;
    this._likes = data.likes;
    this._setHeart = setHeart;
    this._removeHeart = removeHeart;
    this._confirmCardDelete = confirmCardDelete;
    this._handleCardClick = handleCardClick;
  }

  _getElement() {
    this._card = document
    .querySelector(this._selector)
    .content
    .querySelector('.element').cloneNode(true);
    
    return this._card;
  }

  // _handleClick() {
  //   this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  // }

  // _setEventListeners() {
  //   this._heartIcon.addEventListener('click', () => {
  //     if (this._heartIcon.classList.contains('element__like-button_active')) {
  //       this._removeHeart(this._cardId);
  //       } else {
  //       this._setHeart(this._cardId);
  //     }
  //   })

  //   this._image.addEventListener('click', () => {
  //     this._handleCardClick(this._name, this._link)
  //   })

  //   this._trashIcon.addEventListener('click', () => {
  //     this._confirmCardDelete(this._cardId);
  //   })
  // }

  // deleteCard() {
  //   this._card.remove();
  //   this._card = null;
  // }

  generate() {
    this._image = this._element.querySelector('.element__image');
    this._image.src = this._link;
    this._image.alt = `Вид на ${this._name}.`;
    this._element.querySelector('.element__title').textContent = this._name;
    this._heartIcon = this._element.querySelector('.element__like-button');
    this._heartsCount = this._element.querySelector('.element__like-button-span');
    this._heartsCount.textContent = this._likes.length;
    this._trashIcon = this._element.querySelector('.element__trash');
    this._hasTrashIcon();
    this._hasHeartChecked();
    this._setEventListeners();

    return this._element;
  }

  // _hasHeartChecked() {
  //   if (
  //     this._likes.some((data) => {
  //     return this._userId === data._id;
  //   })) {
  //     this._heartIcon.classList.add('element__like-button_active');
  //   }
  // }

  // _hasTrashIcon() {
  //   if (this._userId !== this._ownerId) {
  //     this._trashIcon.classList.add('card__delete-button_hidden');
  //   }
  // }

  // toggleHeart(data) {
  //   this._likes = data.likes;
  //   this._heartsCount.textContent = this._likes.length;
  //   this._heartIcon.classList.toggle('element__like-button_active');
  // }
}
