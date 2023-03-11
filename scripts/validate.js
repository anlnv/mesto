//валидации 
const hiddenError = (errorElement, options) => {
    errorElement.innerText = '';
    errorElement.classList.remove(options.inputErrorClass);
    const inputLabelElement = errorElement.closest(options.inputLabelSelector);
    inputLabelElement.classList.remove(options.labelInvalidClass);
  };
  
  const showError = (errorElement, message, options) => {
    errorElement.innerText = message;
    errorElement.classList.add(options.inputErrorClass);
    const inputLabelElement = errorElement.closest(options.inputLabelSelector);
    inputLabelElement.classList.add(options.labelInvalidClass);
  };
  
  //проверяем инпут на валидность и показываем(скрываем) ошибку 
  const setInputState = (inputElement, isValid, options) => {
    const { inputLabelSelector, inputErrorSelector} = options;
    const inputLabelElement = inputElement.closest(inputLabelSelector);
    const errorElement = inputLabelElement.querySelector(inputErrorSelector);
    if (isValid) {
        hiddenError(errorElement, options);
    } else {
        showError(errorElement, inputElement.validationMessage, options);
    }
  };
  
  //вызывает setInputstate с значением того, валидный или не валидный инпут
  const toggleInputState = (inputElement, options) => {
    const isValid = inputElement.validity.valid;
    setInputState(inputElement, isValid, options);
  };
  
  const enableButton = (submitElement, disabledButtonClass) => {
    submitElement.removeAttribute('disabled');
    submitElement.classList.remove(disabledButtonClass);
  };
  
  const disableButton = (submitElement, disabledButtonClass) => {
    submitElement.setAttribute('disabled', true);
    submitElement.classList.add(disabledButtonClass);
  };
  
  //устанавливает/снимает disabled с кнопки сабмита, если все инпуты валидны/хотя бы один невалидный 
  const toggleButtonState = (inputs, submitElement, disabledButtonClass) => {
    const formIsValid = inputs.every(inputElement => inputElement.validity.valid);
  
    if (formIsValid) {
        enableButton(submitElement, disabledButtonClass);
    } else {
        disableButton(submitElement, disabledButtonClass);
    }
  };
  
  const setEventListeners = (form, options) => {
    const submitElement = form.querySelector(options.submitSelector);
    const inputs = Array.from(form.querySelectorAll(options.inputSelector));
    inputs.forEach(inputElement => {
        inputElement.addEventListener('input', () => {
            toggleInputState(inputElement, options);
            toggleButtonState(inputs, submitElement, options.disabledButtonClass);
        });
    });
    toggleButtonState(inputs, submitElement, options.disabledButtonClass);
  };
  
  const enableValidation = ({
    formSelector,
    submitSelector,
    inputSelector,
    inputLabelSelector,
    inputErrorSelector,
    inputErrorClass,
    disabledButtonClass,
    labelInvalidClass,
  }) => {
    const forms = Array.from(document.querySelectorAll(formSelector));
    console.log(forms);
    forms.forEach(form => {
        setEventListeners(form, {
          submitSelector,
          inputSelector,
          inputLabelSelector,
          inputErrorSelector,
          inputErrorClass,
          disabledButtonClass,
          labelInvalidClass,
        });
    });
  };
  
  //закрытие попапа кликом на оверлей
  function closePopupOverlay(overlaysElement) {
    overlaysElement.forEach(overlay => {
      const popup = overlay.querySelector('.popup__menu');
      overlay.addEventListener('click', (e) => {
        const withinBoundaries = e.composedPath().includes(popup);
        if (!withinBoundaries){
          closePopup(overlay);
        }
    });
  })};
  
  const overlaysElement = Array.from(document.querySelectorAll('.popup'));
  closePopupOverlay(overlaysElement);
  
    //закрытие попапа нажатием на Esc
    function closeByEscBtn(popupElement){
      document.addEventListener('keydown', (evt) => {
        if(evt.key == 'Escape') {
          closePopup(popupElement);
        }
      });
    };