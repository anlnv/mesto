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
const cardsTemplate = document.querySelector('#card-template').content;
const cardName = document.querySelector('#title');
const cardLink = document.querySelector('#link');

//popup opening

function openPopup(elem) {
    elem.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscBtn);
}

function insertProfile(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileAbout.textContent = profileFormAbout.value;
  closePopup(profilePopup);
}

//popup closing

function closePopup(elem) {
    elem.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscBtn);
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

//creating new card

const createCard = ({name, link}) => {  
  const cardElement = cardsTemplate.querySelector('.element').cloneNode(true); 
  const cardImage = cardElement.querySelector('.element__img'); 
  cardImage.src = link; 
  cardElement.alt = name; 
  cardElement.querySelector('.element__text').textContent = name; 
  const likeButton = cardElement.querySelector('.like'); 
  likeButton.addEventListener('click', () => { 
    likeButton.classList.toggle('like_active'); 
  }); 
  const deleteButton = cardElement.querySelector('.delete-button'); 
    deleteButton.addEventListener('click', function() { 
    cardElement.remove(); 
  }); 
  cardImage.addEventListener('click', () => openPopupZoomImage(name, link));
 return cardElement;
}

initialCards.forEach(function (element) {
  cardsContainer.append(createCard({name: element.name, link: element.link}));
});

function addNewCard(evt){
  evt.preventDefault();
  cardsContainer.prepend(createCard({name: cardName.value, link: cardLink.value}));
  closePopup(cardElement);
  formCreate.reset();
  evt.submitter.classList.add('popup__button-save_inactive');
  evt.submitter.disabled = true; 
};

formCreate.addEventListener('submit',addNewCard);

function openPopupZoomImage(name, link) {
  imageZoom.src = link; 
  imageZoom.alt = name;
  imageTitleZoom.textContent = name;
  openPopup(popupZoom);
};

const validationOptions = {
  formSelector: '.popup__form',
  submitSelector: '.popup__button-save',
  inputSelector: '.popup__input',
  inputLabelSelector: '.popup__label',
  inputErrorSelector: '.popup__input-error',
  inputErrorClass: 'popup__input-error_active',
  disabledButtonClass: 'popup__button-save_inactive',
  inputInvalidClass: 'popup__input_invalid',
};

enableValidation(validationOptions);

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