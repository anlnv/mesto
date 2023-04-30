import '../pages/index.css';
import Card from '../components/Card.js';
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api';
import PopupWithApply from '../components/PopupWithApply';
import validationOptions from '../utils/constants.js';

const profileEdit = document.querySelector('.profile__edit-button');
const avatarEdit = document.querySelector('.profile__button-edit');

const buttonAdd = document.querySelector('.profile__add-button');

const profileElement = document.querySelector('.profile');
const profileFormName = document.querySelector('#name');
const profileFormAbout = document.querySelector('#about');

const cardName = document.querySelector('#title');
const cardLink = document.querySelector('#link');

//попап открытия карточки
const popupImage = new PopupWithImage('#zoom-popup');
popupImage.setEventListeners();

let id ;

//создание секции с карточками
const section = new Section({
  renderer: (item) => {
    section.addItem(createCard(item));
  }
}, '.elements__table');

//функция создания карточки
function createCard(el) {
  const card = new Card(
    el.name, el.link, el.owner._id, el._id, id, el.likes,
    '#card-template', 
     {handleCardClick: () => {popupImage.open(el.name, el.link);}
    }, {openPopupDeleteCard: () => popupDeleteCard.open(card._cardId, card)},
    {handleLikeButtonClick: (cardId) => {
      if (card.checkUserLike()) {
        api.removeLikeFromCard(cardId)
          .then((res) => {
            card.setLikesCount(res.likes);
            card.deleteLike();
          })
          .catch(err => console.log(err));
      } else {
        api.addLikeToCard(cardId)
          .then((res) => {
            card.setLikesCount(res.likes);
            card.setLike();
          })
          .catch(err => console.log(err));
      }
    }});
  return card.createCard();
};

//api

const api = new Api({url: 'https://nomoreparties.co/v1/cohort-64', 
    authorization: '570bd9e5-c82e-4063-b8fe-13df3632c8f9'
  });

Promise.all([api.getInitialCards(), api.getUserInfoFromServer()])
.then(([cards, profile]) => {
  id = profile._id;
  userInfo.setUserInfo(profile.name, profile.about, profile.avatar, profile._id);
  section.renderItems(cards);
})
.catch(err => console.log(err));

const popupAddCard = new PopupWithForm('#create-popup', {
  handleSubmitForm: (inputValues) => {
    popupAddCard.buttonSave.textContent = 'Сохранение..';
    api.addNewCard(inputValues.title, inputValues.link)
    .then(res => {section.addItem(createCard(res)); popupAddCard.close()})
    .catch(err => console.log(err))
    .finally(() => popupAddCard.buttonSave.textContent = 'Создать');
  }})
  

 popupAddCard.setEventListeners();


 buttonAdd.addEventListener('click', (function() {
  popupAddCard.open();
  newCardValidation.resetValidation();
 }));



//попап профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__about',
  avatarSelector: '.profile__avatar'});

const profilePopup = new PopupWithForm('#profile-popup', 
{handleSubmitForm: (inputValues) => {
  profilePopup.buttonSave.textContent = 'Сохранение..';
  api.editProfile(inputValues.name, inputValues.about)
  .then(res => {userInfo.setUserInfo(res.name, res.about, res.avatar, res._id); profilePopup.close();})
  .catch(err => console.log(err))
  .finally(() => profilePopup.buttonSave.textContent = 'Сохранить');
}});

profilePopup.setEventListeners();

profileEdit.addEventListener("click", (function() {
  profilePopup.open();
  const user = userInfo.getUserInfo();
  profileFormName.value = user.name;
  profileFormAbout.value = user.info;
  profileValidation.resetValidation();
  console.log(profilePopup._popupForm);
}
));

//попап редактирования аватарки
const avatarPopup = new PopupWithForm('#avatar-popup', 
{handleSubmitForm: (inputValues) => { 
  avatarPopup.buttonSave.textContent = 'Сохранение..';
  api.editAvatar(inputValues.avatar)
  .then(res => {userInfo.setUserAvatar(res.avatar); avatarPopup.close();})
  .catch(err => console.log(err))
  .finally(() => avatarPopup.buttonSave.textContent = 'Сохранить');
}});

avatarEdit.addEventListener("click", (function() {
  avatarPopup.open();
  editAvatarVlidation.resetValidation();
}
));

avatarPopup.setEventListeners();

//попап удаления карточки
const popupDeleteCard = new PopupWithApply('#delete-popup', 
{handleFormSubmit: (id, card) =>{
  api.deleteCard(id)
  .then(() => card.deleteCard())
  .then(() => popupDeleteCard.close())
  .catch(err => console.log(err));
}});

popupDeleteCard.setEventListeners();

//лайки 


 //validation


const profileValidation = new FormValidator(validationOptions, profilePopup._popupForm);
const newCardValidation = new FormValidator(validationOptions, popupAddCard._popupForm);
const editAvatarVlidation = new FormValidator(validationOptions, avatarPopup._popupForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();
editAvatarVlidation.enableValidation();