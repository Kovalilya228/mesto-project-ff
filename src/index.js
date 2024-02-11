import { openPopup, closePopup, closeOnBackdrop } from './scripts/modal.js';
import { createCard } from './scripts/card.js';
import { enableValidation, clearValidation } from './scripts/validation.js';
import { getUserData, getCardsData, changeUserData, addNewCard, deleteCard, likeCard, dislikeCard, editAvatar } from './scripts/api.js';
import './pages/index.css';

const placesList = document.querySelector('.places__list');
const popupList = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');
const popupAvatar = document.querySelector('.popup_type_edit-avatar')
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__image_change');
const formEdit = document.forms["edit-profile"];
const formAdd = document.forms["new-place"];
const formAvatar = document.forms["edit-avatar"];
const profileName = document.querySelector('.profile__title');
const profileDesc = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};
let userId;

popupList.forEach( popup => {
    popup.classList.add('popup_is-animated');
    popup.addEventListener('click', closeOnBackdrop);
})

editButton.addEventListener('click', () => {
    formEdit.reset();
    const popupName = formEdit.elements.name;
    const popupDesc = formEdit.elements.description;
    popupName.value = profileName.textContent;
    popupDesc.value = profileDesc.textContent;
    clearValidation(formEdit, validationConfig);
    openPopup(popupEdit);
});

addButton.addEventListener('click', () => {
    formAdd.reset();
    clearValidation(formAdd, validationConfig);
    openPopup(popupAdd);
});

avatarButton.addEventListener('click', () => {
    formAvatar.reset();
    const avatarLink = formAvatar.elements.link;
    getUserData()
    .then( userData => {
        avatarLink.value = userData.avatar;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(clearValidation(formAvatar, validationConfig));
    openPopup(popupAvatar);
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
    changeUserData(popupName, popupDesc)
    .then(userData => {
        profileName.textContent = userData.name;
        profileDesc.textContent = userData.about;
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(formEdit.elements.submit.textContent = 'Сохранить');
    closePopup(popupEdit);
}

function handleFormAddSubmit(evt) {
    evt.preventDefault();
    const popupPlaceName = formAdd.elements['place-name'];
    const popupLink = formAdd.elements.link;
    addNewCard(popupPlaceName.value, popupLink.value)
    .then(card => {
        placesList.prepend(createCard(deleteCard, likeCard, dislikeCard, handlerCardOpen, card, userId));
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(formAdd.elements.submit.textContent = 'Сохранить');
    closePopup(popupAdd);
    formAdd.reset();
}

function handleFormAvatarSubmit(evt) {
    evt.preventDefault();
    const popupLink = formAvatar.elements.link;
    editAvatar(popupLink.value)
    .then(res => {
        profileImage.setAttribute('style', `background-image: url(${res.avatar});`);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(formAvatar.elements.submit.textContent = 'Сохранить');
    closePopup(popupAvatar);
}

function setInitialData() {
    Promise.all([getUserData(), getCardsData()])
        .then(([userData, cards]) => {
            userId = userData._id;
            profileName.textContent = userData.name;
            profileDesc.textContent = userData.about;
            profileImage.setAttribute('style', `background-image: url(${userData.avatar});`);
            cards.forEach(card => {
                placesList.append(createCard(deleteCard, likeCard, dislikeCard, handlerCardOpen, card, userId));
            })
        })
        .catch((err) => {
            console.log(err);
        })
}

setInitialData();

formEdit.addEventListener('submit', (evt) => {
    formEdit.elements.submit.textContent = 'Сохранение...';
    handleFormEditSubmit(evt);
    }
);

formAdd.addEventListener('submit', (evt) => {
    formAdd.elements.submit.textContent = 'Сохранение...';
    handleFormAddSubmit(evt);
    }
);

formAvatar.addEventListener('submit', (evt) => {
    formAvatar.elements.submit.textContent = 'Сохранение...';
    handleFormAvatarSubmit(evt);
    }
);

enableValidation(validationConfig);