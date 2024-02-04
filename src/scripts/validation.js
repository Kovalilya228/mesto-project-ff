export function enableValidation (element) {
    const errorDesc = document.querySelector(`.${element.id}-error`);
    if (!element.validity.valid) {
        showInputError(element, errorDesc);
    } else {
        hideInputError(element, errorDesc);
    }
}

export function clearValidation() {}

function showInputError (element, desc) {
    element.classList.add('popup__input_type_error');
    desc.classList.add('popup__input-error_active');
}

function hideInputError (element, desc) {
    element.classList.remove('popup__input_type_error');
    desc.classList.remove('popup__input-error_active');
}