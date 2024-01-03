import { initialCards } from './scripts/cards.js';
import { popupOpen } from './scripts/modal.js';
import './pages/index.css';
import { addCard, deleteCard, like, handlerCardOpen } from './scripts/card.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach( item => {
    placesList.append(addCard(item.name, item.link, deleteCard, like, handlerCardOpen));
})

// const profileArea = document.querySelector('.profile');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
// const popupEdit = document.querySelector('.popup_type_edit');
// const popupAdd = document.querySelector('.popup_type_new-card');
// const popupCard = document.querySelector('.popup_type_image');
// const popupEditClose = popupEdit.querySelector('.popup__close');
// const popupAddClose = popupAdd.querySelector('.popup__close');
// const popupCardClose = popupCard.querySelector('.popup__close');

editButton.addEventListener('click', popupOpen);

addButton.addEventListener('click', popupOpen);

placesList.addEventListener('click', popupOpen);
