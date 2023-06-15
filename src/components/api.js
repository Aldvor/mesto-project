const config =  {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-25/',
    headers: {
      authorization: '95b0db2c-9e93-4ee0-a504-586490a651d2',
      'Content-Type': 'application/json'
  }
};

function onResponse(res) {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
};


function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(onResponse)
};

export const getProfile = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(onResponse);
};

export function getInfo() {
  return Promise.all([getProfile(), getInitialCards()]);
};

export const getNewCard = (addData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(addData)
  })
  .then(onResponse);
};

export const editUserProfile = (editData) => {
  return fetch(`${config.baseUrl}/users/me`, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify(editData)
  }).then(onResponse);
};



export const getAddCard = (addData) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: "POST",
      body: JSON.stringify(addData)
  }).then(onResponse);
};

export const editAvatar = (editData) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: "PATCH",
      body: JSON.stringify(editData)
  }).then(onResponse);
};

export const deleteCard = (dataId) => {
  return fetch(`${config.baseUrl}/cards/${dataId}`, {
    headers: config.headers,
    method: "DELETE",
  }).then(onResponse);
}

export const changeLikeStatus = (dataId, isLike) => {
  return fetch(`${config.baseUrl}/cards/likes/${dataId}`, {
      method: isLike ? "DELETE" : "PUT",
      headers: config.headers
}).then(onResponse);
};