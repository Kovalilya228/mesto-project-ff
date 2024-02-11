export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeModalOnEsc);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalOnEsc);
}

export function closeOnBackdrop(evt) {
    if (evt.target.classList.contains('popup__close') || evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget);
    }
}

function closeModalOnEsc(evt) {
    if (evt.key === 'Escape') {
        const inputList = Array.from(evt.currentTarget.querySelectorAll('.popup__input'));
        inputList.forEach(inputElement => {
            inputElement.value = '';
        })
        closePopup(document.querySelector('.popup_is-opened'));
    }
}