const profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('#profile-form');
const buttonClose = document.querySelectorAll('.popup__button-close');
const profileEdit = document.querySelector('.profile__edit-button');


const createPopup = document.querySelector('#create-popup');
const buttonAdd = document.querySelector('.profile__add-button');
const createForm = document.querySelector('#create-form');
const createFormLink = document.querySelector('#link');
const createFormTitle = document.querySelector('#title');


const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileAbout = profileElement.querySelector('.profile__about');
const profileFormName = document.querySelector('#name');
const profileFormAbout = document.querySelector('#about');

const zoomPopup = document.querySelector('#zoom-popup');
const zoomImage = document.querySelector('.popup__img');
const zoomImageTitle = document.querySelector('.popup__img-title');

//popup opening

function popupOpen(elem) {
    elem.classList.add('popup_opened');
}

function profileInsert(evt) {
  evt.preventDefault();
  profileName.textContent = profileFormName.value;
  profileAbout.textContent = profileFormAbout.value;
  popupClose(profilePopup);
}

//popup closing

function popupClose(elem) {
    elem.classList.remove('popup_opened');
}

profileEdit.addEventListener('click', function() {
    popupOpen(profilePopup);
});

buttonClose.forEach( element => {
    element.addEventListener('click', function() {
        popupClose(profilePopup);
        popupClose(createPopup);
        popupClose(zoomPopup);
})});


profileEdit.addEventListener('click', function() {
    popupOpen(profilePopup);
    profileFormName.value = profileName.textContent;
    profileFormAbout.value = profileAbout.textContent;
});

profileForm.addEventListener('submit', profileInsert);

buttonAdd.addEventListener('click', function() {
    popupOpen(createPopup);
    createFormTitle.value = 'Название';
    createFormLink.value = 'Ссылка'; 
});

//aad images

const initialCards = [
    {
      name: 'Эльбрус',
      link: './images/elbrus.jpg'
    },
    {
      name: 'Водопады Агуры',
      link: './images/waterfall.jpg'
    },
    {
      name: 'Челябинская область',
      link: './images/chelyaba.jpg'
    },
    {
      name: 'Увильды',
      link: './images/uvildy.jpg'
    },
    {
      name: 'Зюраткуль',
      link: './images/zuratkul.jpg'
    },
    {
      name: 'Иремель',
      link: './images/iremel.jpg'
    }
  ];

initialCards.forEach(function (element) {
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardsContainer = document.querySelector('.elements__table');
  const cardElement = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__img');
  cardImage.src = element.link;
  cardElement.alt = element.name;
  cardElement.querySelector('.element__text').textContent = element.name;
  
  const likeButton = cardElement.querySelector('.like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('like_active');
  });

  const deleteButton = cardElement.querySelector('.delete-button');
  deleteButton.addEventListener('click', function() {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => openPopupZoomImage(cardElement, cardImage));
  
  cardsContainer.append(cardElement);
});

//creating card

function createCard(evt) {
  evt.preventDefault();
  const cardsTemplate = document.querySelector('#card-template').content;
  const cardsContainer = document.querySelector('.elements__table');
  const cardElement = cardsTemplate.querySelector('.element').cloneNode(true);
  const cardImage = cardElement.querySelector('.element__img');
  const createFormTitle = document.querySelector('#title');
  const createFormLink = document.querySelector('#link');
  cardImage.src = createFormLink.value;
  cardElement.alt = createFormTitle.value;
  cardElement.querySelector('.element__text').textContent = createFormTitle.value;
  
  const likeButton = cardElement.querySelector('.like');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('like_active');
  });

  const deleteButton = cardElement.querySelector('.delete-button');
    deleteButton.addEventListener('click', function() {
    cardElement.remove();
  });

  cardImage.addEventListener('click', () => openPopupZoomImage(cardElement, cardImage));

  cardsContainer.prepend(cardElement);
  popupClose(createPopup);
}

createForm.addEventListener('submit',createCard);

function openPopupZoomImage(element, image) {
  zoomImage.src = image.getAttribute('src'); 
  zoomImage.alt = image.getAttribute('alt');
  zoomImageTitle.textContent = element.querySelector('.element__text').textContent;
  popupOpen(zoomPopup);
};