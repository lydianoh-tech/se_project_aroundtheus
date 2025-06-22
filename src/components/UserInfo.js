export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }
  getUserId() {
    return this._userId;
  }

  setUserInfo({ name, job, avatar, id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
    this.setUserAvatar(avatar);
    this._userId = id;
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
