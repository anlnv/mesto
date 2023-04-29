import Popup from "./Popup";

class PopupWithApply extends Popup{
    constructor(popupSelector, {handleFormSubmit}){
        super(popupSelector);
        this._form = this._popup.querySelector('.popup__form');
        this._handleFormSubmit = handleFormSubmit;
    }

    open(id, card){
        super.open();
        this._deleteId = id;
        this._card = card;
    }

    setEventListeners() {
        super.setEventListeners();
         this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._deleteId, this._card);
         })
    }
}

export default PopupWithApply;