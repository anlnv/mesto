const popupElement = document.querySelector('.popup');
const popupFormElement = document.querySelector('.popup__form');
const popupCloseButtonElement = document.querySelector('.popup__button-close');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

//profile edition

const profileElement = document.querySelector('.profile');
const profileName = profileElement.querySelector('.profile__name');
const profileAbout = profileElement.querySelector('.profile__about');
const popupName = document.querySelector('#name');
const popupAbout = document.querySelector('#about');

function popupOpen() {
    popupElement.classList.add('popup_opened');
    popupName.value = profileName.textContent;
    popupAbout.value = profileAbout.textContent;
}
popupOpenButtonElement.addEventListener('click', popupOpen);

function popupClose() {
    popupElement.classList.remove('popup_opened');
}
popupCloseButtonElement.addEventListener('click', popupClose);

function profileInsert(evt) {
    evt.preventDefault();
    profileName.textContent = popupName.value;
    profileAbout.textContent = popupAbout.value;
    popupClose();
}
popupFormElement.addEventListener('submit', profileInsert);
