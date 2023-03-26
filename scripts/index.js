import Card from './Card.js';
import FormValidator from "./FormValidator.js";
import initialCards from './constants.js';
const profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('#profile-form');
const buttonsClose = document.querySelectorAll('.popup__button-close');
const profileEdit = document.querySelector('.profile__edit-button');

const cardElement = document.querySelector('#create-popup');
const buttonAdd = document.querySelector('.profile__add-button');
const formCreate = document.querySelector('#create-form');

const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileAbout = profileElement.querySelector('.profile__about');
const profileFormName = document.querySelector('#name');
const profileFormAbout = document.querySelector('#about');

const popupZoom = document.querySelector('#zoom-popup');
const imageZoom = document.querySelector('.popup__img');
const imageTitleZoom = document.querySelector('.popup__img-title');

const cardsContainer = document.querySelector('.elements__table');
const cardName = document.querySelector('#title');
const cardLink = document.querySelector('#link');

//popup opening

function openPopup(elem) {
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscBtn);
};

function insertProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileAbout.textContent = profileFormAbout.value;
  closePopup(profilePopup);
};

//popup closing

function closePopup(elem) {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscBtn);
    newCardValidation.resetValidation();
    profileValidation.resetValidation();
  };

profileEdit.addEventListener('click', function() {
    openPopup(profilePopup);
});

buttonsClose.forEach( element => {
    const popupElement = element.closest('.popup');
    element.addEventListener('click', function() {
        closePopup(popupElement);
})});


profileEdit.addEventListener('click', function() {
    openPopup(profilePopup);
    profileFormName.value = profileName.textContent;
    profileFormAbout.value = profileAbout.textContent;
});

profileForm.addEventListener('submit', insertProfile);

buttonAdd.addEventListener('click', function() {
    openPopup(cardElement);
});

//создание карточек класса Card

function createCard(el) {
  const card = new Card(el.name, el.link, '#card-template', openPopupZoomImage);
  const element = card.createCard();
  return element;
};

initialCards.forEach(function (el) {
  const element = createCard(el);
  cardsContainer.append(element);
});

//добавление карточки с помощью формы 
function addNewCard(evt){
  evt.preventDefault();
  const card = new Card(cardName.value, cardLink.value, '#card-template', openPopupZoomImage);
  const element = card.createCard();
  cardsContainer.prepend(element);
  closePopup(cardElement);
  formCreate.reset();
};

formCreate.addEventListener('submit',addNewCard);

//функция открытия попапа карточки
function openPopupZoomImage(name, link) {
  imageZoom.src = link; 
  imageZoom.alt = name;
  imageTitleZoom.textContent = name;
  openPopup(popupZoom);
};

 //закрытие попапа кликом на оверлей
 function closePopupOverlay() {
  document.querySelectorAll('.popup').forEach(popup => {
    popup.addEventListener('click', (e) => {
      if (e.target.classList.contains('popup')){
        closePopup(popup);
      }
  });
})}; 

closePopupOverlay();

  //закрытие попапа нажатием на Esc
  const closeByEscBtn = (evt) => {
      if(evt.key == 'Escape') {
        const popupOpened = document.querySelector('.popup_opened');
        closePopup(popupOpened);
      }
    }


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
console.log(formCreate, profileForm);
const profileValidation = new FormValidator(validationOptions, profileForm);
const newCardValidation = new FormValidator(validationOptions, formCreate);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 



