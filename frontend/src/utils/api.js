class Api {
  constructor(config) {
    this._url = config.url;
  //  this._headers = config.headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  editProfile(data) {
    return fetch(`${this._url}users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  getProfile() {
    return fetch(`${this._url}users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  editAvatar(link) {
    return fetch(`${this._url}users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: link.avatar
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  getInitialCards() {
    return fetch(`${this._url}cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  addCard(data) {
    return fetch(`${this._url}cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  removeCard(id) {
    return fetch(`${this._url}cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  changeLikeCardStatus(id, like) {
    let methodName = like?"PUT":"DELETE";
      return fetch(`${this._url}cards/${id}/likes`, {        
          method: methodName,
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }       
      })
      .then((res) =>      
        res.ok
        ? res.json()
        : Promise.reject(`Error! ${res.statusText}`).catch((err) =>
            console.log(err)
          )
    );
  }

  giveLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }

  takeLike(id) {
    return fetch(`${this._url}cards/likes/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      return this._getResponseData(res);
    }); 
  }
}


const config = {
  url: 'https://api.mentor.nomoredomains.monster/',
};

const api = new Api(config);

export default api;
