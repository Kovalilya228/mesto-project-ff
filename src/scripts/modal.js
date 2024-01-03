import { addCard, deleteCard, like, handlerCardOpen } from './card.js';

const popupList = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupCard = document.querySelector('.popup_type_image');
const popupEditClose = popupEdit.querySelector('.popup__close');
const popupAddClose = popupAdd.querySelector('.popup__close');
const popupCardClose = popupCard.querySelector('.popup__close');
const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');

popupList.forEach(item => {
    item.classList.add('popup_is-animated');
})

export function popupOpen(evt) {
    if (evt.target === editButton) {
        // popupEdit.classList.add('popup_is-animated');
        const popupName = formEdit.elements.name;
        const popupDesc = formEdit.elements.description;
        popupName.value = profileName.textContent;
        popupDesc.value = profileDesc.textContent;
        
        popupEdit.classList.add('popup_is-opened');
        
        popupClose(popupEditClose, popupEdit);
    } else if (evt.target === addButton) {
        // popupAdd.classList.add('popup_is-animated');
        formAdd.elements.link.value = 'https://wallpapershome.ru/images/pages/pic_h/21485.jpg';     // НЕ ЗАБЫТЬ УДАЛИТЬ ПЕРЕД РЕВЬЮ
        popupAdd.classList.add('popup_is-opened');
        popupClose(popupAddClose, popupAdd);
    } else if (evt.target.classList.contains('card__image')) {
        popupClose(popupCardClose, popupCard);
    }
    document.addEventListener('keydown', closeModalOnEsc);
}

function popupClose(closeBtn, popup) {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.popup').classList.remove('popup_is-opened');
    })
    popup.addEventListener('click', function closeOnBackdrop(evt){
        const popup = evt.currentTarget;
        const isClickedOnBackdrop = evt.target === popup;
        if (isClickedOnBackdrop) {
            popup.classList.remove('popup_is-opened');
        }
    })
}

function closeModalOnEsc(evt) {
    const modal = evt.target.closest('.popup');
    if (evt.key === 'Escape' && evt.target.classList.contains('popup__input')) {
        modal.classList.remove('popup_is-opened');
    }
    document.removeEventListener('keydown', closeModalOnEsc);
}

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const popupName = formEdit.elements.name.value;
    const popupDesc = formEdit.elements.description.value;
    profileName.textContent = popupName;
    profileDesc.textContent = popupDesc;
    evt.target.closest('.popup').classList.remove('popup_is-opened');
}

formEdit.addEventListener('submit', handleFormEditSubmit);

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const popupPlaceName = formAdd.elements['place-name'];
    const popupLink = formAdd.elements.link;
    placesList.prepend(addCard(popupPlaceName.value, popupLink.value, deleteCard, like, handlerCardOpen));
    evt.target.closest('.popup').classList.remove('popup_is-opened');
    popupPlaceName.value = '';
    popupLink.value = '';
}

formAdd.addEventListener('submit', handleFormAddSubmit);