class UserInfo {
    constructor({nameSelector, infoSelector}){
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }

    getUserInfo() {
        this._userInfo = {};
        this._userInfo.name = this._name.textContent;
        this._userInfo.info = this._info.textContent;
        return this._userInfo;
    }

    setUserInfo(name, info){
        this._name.textContent = name;
        this._info.textContent = info;
    }
}

export default UserInfo;