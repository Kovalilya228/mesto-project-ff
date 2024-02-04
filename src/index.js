import { initialCards } from './scripts/cards.js';
import { openPopup, closePopup, closeOnBackdrop } from './scripts/modal.js';
import { createCard, deleteCard, like } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import './pages/index.css';

const placesList = document.querySelector('.places__list');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');


document.querySelectorAll('.popup__input').forEach(item => {
    item.addEventListener('input', (evt) => {
        enableValidation(evt.target);
    })
})

popupList.forEach(popup => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', closeOnBackdrop);
})

initialCards.forEach( item => {
    placesList.append(createCard(item.name, item.link, deleteCard, like, handlerCardOpen));
})

editButton.addEventListener('click', () => {
    const popupName = formEdit.elements.name;
    const popupDesc = formEdit.elements.description;
    popupName.value = profileName.textContent;
    popupDesc.value = profileDesc.textContent;
    openPopup(popupEdit);
});

addButton.addEventListener('click', ()=> {
    openPopup(popupAdd);
});

function handlerCardOpen(evt) {
    const popupCard = document.querySelector('.popup_type_image');
    popupCard.querySelector('.popup__image').src = evt.target.src;
    popupCard.querySelector('.popup__caption').textContent = evt.target.alt;
    openPopup(popupCard);
}

function handleFormEditSubmit(evt) {
    evt.preventDefault();
    const popupName = formEdit.elements.name.value;
    const popupDesc = formEdit.elements.description.value;
    profileName.textContent = popupName;
    profileDesc.textContent = popupDesc;
    closePopup(popupEdit);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const popupPlaceName = formAdd.elements['place-name'];
    const popupLink = formAdd.elements.link;
    placesList.prepend(createCard(popupPlaceName.value, popupLink.value, deleteCard, like, handlerCardOpen));
    closePopup(popupAdd);
    formAdd.reset();
}

formEdit.addEventListener('submit', handleFormEditSubmit);

formAdd.addEventListener('submit', handleFormAddSubmit);