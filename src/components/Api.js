class Api{
    constructor({url, authorization}) {
        this._url = url;
        this._authorization = authorization;
    }

    _responseProcessing(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfoFromServer()  {
        return fetch(this._url + '/users/me',{
        method: "GET",
        headers: {
            authorization: this._authorization
        }})
        .then(res => this._responseProcessing(res))
    }

    getInitialCards() {
        return fetch(this._url + '/cards',{
            method: "GET",
            headers: {
                authorization: this._authorization
            }})
            .then(res => this._responseProcessing(res))
    }

    editProfile(name, info) {
        return fetch(this._url + '/users/me', {
            method: "PATCH",
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            name: name,
            about: info
        })
    })
    .then(res => this._responseProcessing(res))
    }

    addNewCard(name, link) {
        return fetch(this._url + '/cards', {
            method: "POST",
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
    .then(res => this._responseProcessing(res))
    }

    deleteCard(deleteId)  {
        return fetch(this._url + '/cards/' + deleteId, {
            method: "DELETE",
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            }
    })
    .then(res => this._responseProcessing(res))
    }

    addLikeToCard(id){
        return fetch(this._url + '/cards/' + id + '/likes', {
            method: "PUT",
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            }
    })
    .then(res => this._responseProcessing(res))
    }

    removeLikeFromCard(id){
        return fetch(this._url + '/cards/' + id + '/likes', {
            method: "DELETE",
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            }
    })
    .then(res => this._responseProcessing(res))
    }

    editAvatar(avatar){
        return fetch(this._url + '/users/me/avatar', {
            method: "PATCH",
            headers: {
            authorization: this._authorization,
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            avatar: avatar
        })
    })
    .then(res => this._responseProcessing(res))
    }
}

export default Api;