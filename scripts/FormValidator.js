class FormValidator {
    constructor(formElement, options){
        this._formElement = formElement;
        this._options = options;
    }

    enableValidation = () => {
        this._setEventListeners();
    }

    _showError = (inputElement) => { 
        const inputLabelElement = inputElement.closest(this._options.inputLabelSelector); 
        const errorElement = inputLabelElement.querySelector(this._options.inputErrorSelector); 
        errorElement.textContent = inputElement.validationMessage; 
        errorElement.classList.add(this._options.inputErrorClass); 
        inputElement.classList.add(this._options.inputInvalidClass); 
      }

    _hiddenError = (inputElement) => {
        const inputLabelElement = inputElement.closest(this._options.inputLabelSelector);
        const errorElement = inputLabelElement.querySelector(this._options.inputErrorSelector);
        errorElement.textContent = '';
        errorElement.classList.remove(this._options.inputErrorClass);
        inputElement.classList.remove(this._options.inputInvalidClass);
      }

    //проверяем инпут на валидность и показываем(скрываем) ошибку 
    _setInputState = (inputElement, isValid) => {
        if (isValid) {
            this._hiddenError(inputElement); 
        } else {
            this._showError(inputElement);
        }
    }

    _enableButton = (submitElement) => {
        submitElement.removeAttribute('disabled');
        submitElement.classList.remove(this._options.disabledButtonClass);
      }
      
    _disableButton = (submitElement) => {
        submitElement.setAttribute('disabled', true);
        submitElement.classList.add(this._options.disabledButtonClass);
      }

    //устанавливает/снимает disabled с кнопки сабмита, если все инпуты валидны/хотя бы один невалидный 
    _toggleButtonState = (inputs, submitElement) => {
        const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
        if (formIsValid) {
            this._enableButton(submitElement);
        } else {
            this._disableButton(submitElement);
        }
      }
  
    _setEventListeners = () => {
        const submitElement = this._formElement.querySelector(this._options.submitSelector);
        const inputs = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        inputs.forEach(inputElement => {
            inputElement.addEventListener('input', () => {
                this._toggleInputState(inputElement);
                this._toggleButtonState(inputs, submitElement);
            });
        });
    this._toggleButtonState(inputs, submitElement);
  }
  
  //вызывает setInputstate с значением того, валидный или не валидный инпут
  _toggleInputState = (inputElement) => {
        const isValid = inputElement.validity.valid;
        this._setInputState(inputElement, isValid);
  }

}

export default FormValidator;