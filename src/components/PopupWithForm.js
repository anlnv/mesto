import Popup from "./Popup.js";

class PopupWithForm extends Popup {
    constructor(popupSelctor, {handleSubmitForm}) {
        super(popupSelctor);
        this._handleSubmitForm = handleSubmitForm;
        this._popupForm = this._popup.querySelector('.popup__form');
        this._inputsList = this._popup.querySelectorAll('.popup__input');
        this._buttonSave = this._popup.querySelector('.popup__button-save');
    }

    _getInputValues(){
        this._formValues = {};
        this._inputsList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmitForm(this._getInputValues());
        })
    }

    close() {
        super.close();
        this._popupForm.reset();
    }
}

export default PopupWithForm;