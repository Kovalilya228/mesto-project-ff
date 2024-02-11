const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export function enableValidation () {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach(formElement => {
        setEventListeners(formElement, config);
    })
}

export function clearValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach(inputElement => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
        hideInputError(inputElement, errorElement, config);
    })
    toggleButtonState(inputList, formElement.submit);
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.submit;
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };

function checkInputValidity (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.patternMismatch);
    } else if (inputElement.validity.valueMissing) {
        inputElement.setCustomValidity(inputElement.dataset.valueMissing);
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showInputError(inputElement, errorElement, inputElement.validationMessage);
    } else {
        hideInputError(inputElement, errorElement);
    }
}

function showInputError (element, errorElement, errorMessage) {
    element.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
}

function hideInputError (element, errorElement) {
    element.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
}

function hasInvalidInput (inputList) {
    return inputList.some(el => {
        return !el.validity.valid
    })
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.setAttribute('disabled', '');
    } else {
      buttonElement.removeAttribute('disabled');
    }
}