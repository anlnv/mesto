class Card {
    constructor(name, link, ownerID, cardId, id, likes, templateSelector, {handleCardClick},{openPopupDeleteCard}, {handleLikeButtonClick}){
        this._name = name;
        this._link = link;
        this._cardId = cardId;
        this._ownerId = ownerID;
        this._myId = id;
        this._templateSelector = templateSelector;
        this._handleCardClick = handleCardClick;
        this._likes = likes;
        this._openPopupDeleteCard = openPopupDeleteCard;
        this._handleLikeButtonClick = handleLikeButtonClick;
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
        this._likesCounter = this._element.querySelector('.element__like-counter');

        this._elementImage.src = this._link; 
        this._elementImage.alt = this._name; 
        this._elementText.textContent = this._name;
        this._likesCounter.textContent = this._likes.length;

        if(this.checkUserLike()){
            this.setLike();
        } else{
            this.deleteLike();
        }

       this._setEventListeners();
        return this._element;
    }

    deleteCard = () => {
        this._element.remove();
        this._element = null;
    }

    setLikesCount(likes) {
        this._likes = likes;
        this._likesCounter.textContent = likes.length;
      }

    checkUserLike() {
        return this._likes.some((user) => this._myId == user._id)
    }

    setLike() {
        this._likeButton.classList.add('like_active')
    }

    deleteLike() {
        this._likeButton.classList.remove('like_active')
    }

    _setEventListeners = () => {
        this._elementImage.addEventListener('click', this._handleCardClick);
        this._likeButton.addEventListener('click',() => this._handleLikeButtonClick(this._cardId));
        if(this._myId != this._ownerId){
            this._deleteButton.remove();
        }else{
            this._deleteButton.addEventListener('click', ()=> this._openPopupDeleteCard( this._cardId, this._element));
        }
    }
}

export default Card;