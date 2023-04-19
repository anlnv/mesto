import '../pages/index.css';
import Card from '../scripts/Card.js';
import FormValidator from "../scripts/FormValidator.js";
import initialCards from '../utils/constants.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import Section from '../scripts/Section.js';
import UserInfo from '../scripts/UserInfo.js';
/*onst profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('#profile-form');
const buttonsClose = document.querySelectorAll('.popup__button-close');*/
const profileEdit = document.querySelector('.profile__edit-button');

const buttonAdd = document.querySelector('.profile__add-button');

const profileElement = document.querySelector('.profile');
const profileFormName = document.querySelector('#name');
const profileFormAbout = document.querySelector('#about');

const cardName = document.querySelector('#title');
const cardLink = document.querySelector('#link');

//попап открытия карточки
const popupImage = new PopupWithImage('#zoom-popup');
popupImage.setEventListeners();

//создание секции с карточками
const cards = new Section({
  items: initialCards, 
  renderer: (item) => {
    cards.addItem(createCard(item));
  }
}, '.elements__table');

cards.renderItems();

//функция создания карточки
function createCard(el) {
  const card = new Card(
    el.name, el.link,
    '#card-template', 
     {handleCardClick: () => {popupImage.open(el.name, el.link);}
    });
  return card.createCard();
};

//попап добавления карточки
const createPopup = new PopupWithForm('#create-popup', {
  handleSubmitForm: (el) => {
    const card = new Card(
      cardName.value, cardLink.value,
      '#card-template', 
       {handleCardClick: () => {popupImage.open(el.title, el.link); }
      });
    cards.addItem(card.createCard());
  }})

  createPopup.setEventListeners();

  buttonAdd.addEventListener('click', (function() {
    createPopup.open();}));

//попап профиля
const userInfo = new UserInfo({
  nameSelector: '.profile__name', 
  infoSelector: '.profile__about'});

const profilePopup = new PopupWithForm('#profile-popup', {handleSubmitForm: () => {
  userInfo.setUserInfo(profileFormName.value, profileFormAbout.value);
  profilePopup.close();
}});

profilePopup.setEventListeners();

profileEdit.addEventListener("click", (function() {
  profilePopup.open();
  const user = userInfo.getUserInfo();
  profileFormName.value = user._name;
  profileFormAbout.value = user._info;
  profileValidation.resetValidation();
  console.log(profilePopup._popupForm);
}
));

//validation

const validationOptions = {
  submitSelector: '.popup__button-save',
  inputSelector: '.popup__input',
  inputLabelSelector: '.popup__label',
  inputErrorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input-error_active',
  disabledButtonClass: 'popup__button-save_inactive',
  inputInvalidClass: 'popup__input_invalid',
};
const profileValidation = new FormValidator(validationOptions, profilePopup._popupForm);
const newCardValidation = new FormValidator(validationOptions, createPopup._popupForm);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 




/*const profilePopup = new PopupWithForm('#profile-popup', handleSubmitForm);*/