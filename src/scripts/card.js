const cardTemplate = document.querySelector('#card-template').content;

export function createCard(title, image, deleteCard, like, dislike, handlerCardOpen, cardData, userData) {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCount = cardElement.querySelector('.card__like-counter');
    cardElement.querySelector('.card__title').textContent = title;
    cardImage.src = image;
    cardImage.alt = title;
    cardLikeCount.textContent = cardData.likes.length;
    cardData.likes.some(likeInfo => {
        if (userData._id === likeInfo._id) {
            likeButton.classList.add('card__like-button_is-active');
            return true
        }
    })
    deleteButton.addEventListener('click', (evt) => {
        deleteCard(cardData._id);
        evt.target.closest('.card').remove();
    });
    likeButton.addEventListener('click', (evt) => {
        if (likeButton.classList.contains('card__like-button_is-active')) {
            dislike(cardData._id)
            .then( newCardData => {
                cardLikeCount.textContent = newCardData.likes.length;
            })
        } else {
            like(cardData._id)
            .then( newCardData => {
                cardLikeCount.textContent = newCardData.likes.length;
            })
        }
        evt.target.classList.toggle('card__like-button_is-active');
    });
    cardImage.addEventListener('click', handlerCardOpen);
    return cardElement;
}