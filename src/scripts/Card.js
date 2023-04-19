class Card {
    constructor(name, link, templateSelector, {handleCardClick}){
        this._name = name;
        this._link = link;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
    }

    //получаем разметку карточки для дальнейшего наполнения и использования в методах
    _getTemplate(){
        const cardElement = document
        .querySelector(this._templateSelector)
        .content
        .querySelector('.element')
        .cloneNode(true); 
        return cardElement;
    }

    //публичный метод создания карточки
    createCard() {
        this._element = this._getTemplate();
        this._elementImage = this._element.querySelector('.element__img');
        this._elementText = this._element.querySelector('.element__text');
        this._likeButton = this._element.querySelector('.like');
        this._deleteButton = this._element.querySelector('.delete-button'); 

        this._elementImage.src = this._link; 
        this._elementImage.alt = this._name; 
        this._elementText.textContent = this._name;

       this._setEventListeners();

        return this._element;
    }

    _likeCard = () => {
        this._likeButton.classList.toggle('like_active');
    }

    _deleteCard = () => {
        this._element.remove();
        this._element = null;
    }

    _setEventListeners = () => {
        this._elementImage.addEventListener('click', this._handleCardClick);
        this._likeButton.addEventListener('click', this._likeCard);
        this._deleteButton.addEventListener('click', this._deleteCard);
    }
}

export default Card;