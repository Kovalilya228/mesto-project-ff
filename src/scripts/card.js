const cardTemplate = document.querySelector('#card-template').content;

// export function createCard(deleteCard, like, dislike, handlerCardOpen, cardData, userId) {
//     const title = cardData.name;
//     const image = cardData.link;
//     const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
//     const deleteButton = cardElement.querySelector('.card__delete-button');
//     const likeButton = cardElement.querySelector('.card__like-button');
//     const cardImage = cardElement.querySelector('.card__image');
//     const cardLikeCount = cardElement.querySelector('.card__like-counter');
//     cardElement.querySelector('.card__title').textContent = title;
//     cardImage.src = image;
//     cardImage.alt = title;
//     cardLikeCount.textContent = cardData.likes.length;

//     if(cardData.likes.some(likeInfo => userId === likeInfo._id)) {
//         likeButton.classList.add('card__like-button_is-active');
//     }

//     const deleteCardHandler = (card, cardId) => {
//         deleteCard(cardId).then(() => {
//             card.remove();
//         })
//         .catch(err => console.log(err));
//     };
    
//     const checkOwner = (ownerId, userId, deleteButton) => {
//         if (ownerId !== userId) {
//             deleteButton.setAttribute('style', 'display: none;');
//         }
//     }

//     checkOwner(cardData.owner._id, userId, deleteButton);

//     deleteButton.addEventListener('click', () => {
//         deleteCardHandler(cardElement, cardData._id);
//     });

//     const likeCard = (likeButton, likeCounter, cardId) => {
//         if (likeButton.classList.contains('card__like-button_is-active')) {
//             dislike(cardId)
//             .then( newCardData => {
//                 likeCounter.textContent = newCardData.likes.length;
//             })
//             .catch(err => console.log(err));
//         } else {
//             like(cardId)
//             .then( newCardData => {
//                 likeCounter.textContent = newCardData.likes.length;
//             })
//             .catch(err => console.log(err));
//         }
//         likeButton.classList.toggle('card__like-button_is-active');
//     }

//     likeButton.addEventListener('click', () => {
//         likeCard(likeButton, cardLikeCount, cardData._id);
//     });

//     cardImage.addEventListener('click', handlerCardOpen);

//     return cardElement;
// }

export const deleteCardHandler = (card, cardId, deleteCard) => {
    deleteCard(cardId).then(() => {
        card.remove();
    })
    .catch(err => console.log(err));
};
export const likeCardHandler = (likeButton, likeCounter, cardId, like, dislike) => {
    const likeMethod = likeButton.classList.contains('card__like-button_is-active') ? dislike : like;
    likeMethod(cardId) 
        .then((newCardData) => {
           likeCounter.textContent = newCardData.likes.length; 
           likeButton.classList.toggle("card__like-button_is-active"); 
        })
        .catch(err => console.log(err));
}
export function createCard(deleteCardHandler, likeCardHandler, handlerCardOpen, cardData, userId, likeCard, dislikeCard, deleteCard) {
    const title = cardData.name;
    const image = cardData.link;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const likeButton = cardElement.querySelector('.card__like-button');
    const cardImage = cardElement.querySelector('.card__image');
    const cardLikeCount = cardElement.querySelector('.card__like-counter');
    cardElement.querySelector('.card__title').textContent = title;
    cardImage.src = image;
    cardImage.alt = title;
    cardLikeCount.textContent = cardData.likes.length;
    if(cardData.likes.some(likeInfo => userId === likeInfo._id)) {
        likeButton.classList.add('card__like-button_is-active');
    }
    const checkOwner = (ownerId, userId, deleteButton) => {
        if (ownerId !== userId) {
            deleteButton.setAttribute('style', 'display: none;');
        }
    }
    checkOwner(cardData.owner._id, userId, deleteButton);
    deleteButton.addEventListener('click', () => {
        deleteCardHandler(cardElement, cardData._id, deleteCard);
    });
    likeButton.addEventListener('click', () => {
        likeCardHandler(likeButton, cardLikeCount, cardData._id, likeCard, dislikeCard);
    });
    cardImage.addEventListener('click', handlerCardOpen);
    return cardElement;
}