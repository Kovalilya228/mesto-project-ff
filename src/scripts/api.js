const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-5/',
    headers: {
        authorization: '261bdfb0-22be-46fa-bb01-8106523c29a8',
        'Content-Type': 'application/json'
    },
}

export const getUserData = () => {
    return fetch ( `${config.baseUrl}users/me`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(res => handleResponse(res))
}

export const getCardsData = () => {
    return fetch (`${config.baseUrl}cards`, {
        method: 'GET',
        headers: config.headers,
    })
    .then(res => handleResponse(res))
}

export const changeUserData = (newName, newAbout) => {
    return fetch (`${config.baseUrl}users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout,
        })
    })
    .then(res => handleResponse(res))
}

export const addNewCard = (cardName, cardLink) => {
    return fetch (`${config.baseUrl}cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink,
        })
    })
    .then(res => handleResponse(res))
}

export const deleteCard = (cardId) => {
    return fetch (`${config.baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => handleResponse(res))
}

export const likeCard = (cardId) => {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(res => handleResponse(res))
}

export const dislikeCard = (cardId) => {
    return fetch(`${config.baseUrl}cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(res => handleResponse(res))
}

export const editAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink,
        }),
    })
    .then(res => handleResponse(res))
}

const handleResponse = (res) => {
    if (res.ok) return res.json()
    return Promise.reject(`Ошибка: ${res.status}`)
}