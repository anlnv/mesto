const profilePopup = document.querySelector('#profile-popup');
const profileForm = profilePopup.querySelector('#profile-form');
const buttonsClose = document.querySelectorAll('.popup__button-close');
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

const cardsContainer = document.querySelector('.elements__table');

//popup opening

function openPopup(elem) {
    elem.classList.add('popup_opened');
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
}

profileEdit.addEventListener('click', function() {
    openPopup(profilePopup);
});

buttonsClose.forEach( element => {
    element.addEventListener('click', function() {
        closePopup(element.closest('.popup'));
})});


profileEdit.addEventListener('click', function() {
    openPopup(profilePopup);
    profileFormName.value = profileName.textContent;
    profileFormAbout.value = profileAbout.textContent;
});

profileForm.addEventListener('submit', insertProfile);

buttonAdd.addEventListener('click', function() {
    openPopup(createPopup);
});

//creating new card

const createCard = ({name, link}) => {
  const cardsTemplate = document.querySelector('#card-template').content;  
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
  cardsContainer.prepend(createCard({name: document.querySelector('#title').value, link: document.querySelector('#link').value}));
  closePopup(createPopup);
};

createForm.addEventListener('submit',addNewCard);

function openPopupZoomImage(name, link) {
  zoomImage.src = link; 
  zoomImage.alt = name;
  zoomImageTitle.textContent = name;
  openPopup(zoomPopup);
};