import {initialCards} from './scripts/cards.js';
import './pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
// @todo: Функция создания карточки
function addCard(title, image, deleteCard) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__title').textContent = title;
    cardElement.querySelector('.card__image').src = image;
    cardElement.querySelector('.card__image').alt = title;
    deleteButton.addEventListener('click', deleteCard);
    return cardElement;
}
// @todo: Функция удаления карточки
function deleteCard(event) {
    event.target.closest('.card').remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach( item => {
    placesList.append(addCard(item.name, item.link, deleteCard));
})
