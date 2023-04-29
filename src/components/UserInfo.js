class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._name.textContent;
        this._userInfo.info = this._info.textContent;
        this._userInfo.id = this._id;
        return this._userInfo;
    }

    setUserInfo(name, info, avatar, id){
        this._name.textContent = name;
        this._info.textContent = info;
        this._avatar.src = avatar;
        this._id = id;
    }

    setUserAvatar(avatar) {
        this._avatar.src = avatar;
    }
}

export default UserInfo;