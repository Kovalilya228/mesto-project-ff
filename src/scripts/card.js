import {} from './modal.js'

const cardTemplate = document.querySelector('#card-template').content;

export function addCard(title, image, deleteCard, like, handlerCardOpen) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    cardElement.querySelector('.card__title').textContent = title;
    cardImage.src = image;
    cardImage.alt = title;
    deleteButton.addEventListener('click', deleteCard);
    likeButton.addEventListener('click', like);
    cardImage.addEventListener('click', handlerCardOpen);
    return cardElement;
}

export function deleteCard(event) {
    event.target.closest('.card').remove();
}

export function like(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

export function handlerCardOpen(evt) {
    const popupCard = document.querySelector('.popup_type_image');
    popupCard.querySelector('.popup__image').src = evt.target.src;
    popupCard.querySelector('.popup__caption').textContent = evt.target.closest('.card').querySelector('.card__title').textContent;
    popupCard.classList.add('popup_is-opened');
}
