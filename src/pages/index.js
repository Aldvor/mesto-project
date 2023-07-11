import './index.css';


// // import { FormValidator, config } from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Api from '../components/Api.js';
import Section from '../components/Section.js';
// import PopupWithImage from '../components/PopupWithImage.js';
// import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
// import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
// import { popupEditButton, avatarSubmitButton, cardSaveButton } from '../utils/constants'


const api = new Api({
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-25', 
  headers: {
    authorization: '95b0db2c-9e93-4ee0-a504-586490a651d2',
    'Content-Type': 'application/json'
  }
})


let userId = "";


Promise.all([api.getUserData(), api.getInitialCards()])
.then(([userData, initialCards]) => {
  userId = userData._id;
  dataUserInfo.setUserInfo(userData);
  cards.renderItems(initialCards);

})
.catch(err => console.log(`Ошибка: ${err}`));

const createCard = (data) => {
  const card = new Card({
    data: data,
    selector: '.element',
    userId: userId,
    handleCardClick: (name, link) => {
      popupWithImageItem.open(name, link);
    },
    confirmCardDelete: (cardId) => {
      popupConfirmDelete.open();
      popupConfirmDelete.submitCallback(() => {
        api.deleteCard(cardId)
        .then(() => {
          popupConfirmDelete.close();
          card.deleteCard();
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        })
      })
    },
  })
}


//     setHeart: (cardId) => {
//       api.setHeart(cardId)
//       .then((data) => {
//         card.toggleHeart(data);
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       })
//     },
//     removeHeart: (cardId) => {
//       api.removeHeart(cardId)
//       .then((data) => {
//         card.toggleHeart(data);
//       })
//       .catch((err) => {
//         console.log(`Ошибка: ${err}`);
//       })
//     }
//   })

//   const cardElement = card.generate();
//   return cardElement;
// }


const cards = new Section({
  renderer: (card) => {
    cards.addItem(createCard(card));
  }
}, '.element');

// const popupWithImageItem = new PopupWithImage('#popup_image');
// popupWithImageItem._setEventListeners();


const dataUserInfo = new UserInfo({
  profileAvatar: '.profile__avatar',
  profileTitle: '.profile__title',
  profileSubtitle: '.profile__subtitle'
});

// const popupEditProfile = new PopupWithForm({
//   popupSelector: '#popup_edit-profile',
//   handleFormSubmit: (userData) => {
//     popupEditProfile.renderLoading(true);
//     api.updateUserData({ 
//       name: userData.name,
//       about: userData.description
//     })
//     .then((userData) => {
//       dataUserInfo.setUserInfo({ 
//           name: userData.name,
//           about: userData.about
//         });
//       popupEditProfile.close();
//     })
//     .catch((err) => {
//       console.log(`Ошибка: ${err}`);
//     })
//     .finally(() => {
//       popupEditProfile.renderLoading(false);
//     })
//   }
// });
// popupEditProfile._setEventListeners();


// function setEditProfileData({ name, description }) {
//   nameInput.value = name;
//   jobInput.value = description;
// }


// popupEditButton.addEventListener('click', () => {
//   const userData = dataUserInfo.getUserInfo();
//   setEditProfileData({
//     name: userData.nameInput,
//     description: userData.jobInput
//   });
//   popupEditProfile.open();
// });


// const popupEditAvatar = new PopupWithForm({
//   popupSelector: '#popup_edit-avatar',
//   handleFormSubmit: (userData) => {
//     popupEditAvatar.renderLoading(true);
//     api.updateAvatar(userData.avatar)
//     .then((userData) => {
//       dataUserInfo.editAvatar(userData);
//       popupEditAvatar.close();
//     })
//     .catch((err) => {
//       console.log(`Ошибка: ${err}`);
//     })
//     .finally(() => {
//       popupEditAvatar.renderLoading(false);
//     })
//   }
// });
// popupEditAvatar._setEventListeners();


// avatarSubmitButton.addEventListener('click', () => {
//   popupEditAvatar.open();
// });


// const popupAddCard = new PopupWithForm({
//   popupSelector: '#popup_add-card',
//   handleFormSubmit: () => {
//     popupAddCard.renderLoading(true);
//     api.updateCard({ 
//       name: newPlaceTitle.value,
//       link: newPlaceImage.value
//     })
//     .then((data) => {
//       cards.addItem(createCard(data));
//       popupAddCard.close();
//     })
//     .catch((err) => {
//       console.log(`Ошибка: ${err}`);
//     })
//     .finally(() => {
//       popupAddCard.renderLoading(false);
//     })
//   }
// });
// popupAddCard._setEventListeners();


// cardSaveButton.addEventListener('click', () => {
//   popupAddCard.open();
// });

// const popupConfirmDelete = new PopupWithConfirmation({
//   popupSelector: '#popup_delete-card'
// });
// popupConfirmDelete._setEventListeners();


// const editFormValidaton = new FormValidator(config, popupEditProfile);
// editFormValidaton.enableValidation();


// const addFormValidaton = new FormValidator(config, popupAddCard);
// addFormValidaton.enableValidation();


// const changeAvatarValidation = new FormValidator(config, popupEditAvatar);
// changeAvatarValidation.enableValidation();