import { initialCards } from './scripts/cards.js';
import { popupOpen } from './scripts/modal.js';
import './pages/index.css';
import { addCard, deleteCard, like, handlerCardOpen } from './scripts/card.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach( item => {
    placesList.append(addCard(item.name, item.link, deleteCard, like, handlerCardOpen));
})

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

editButton.addEventListener('click', popupOpen);

addButton.addEventListener('click', popupOpen);

placesList.addEventListener('click', popupOpen);