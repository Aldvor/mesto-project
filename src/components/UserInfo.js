export default class UserInfo {
  constructor({ profileAvatar, profileTitle, profileSubtitle }) {
    this._profileAvatar = document.querySelector(profileAvatar),
    this._profileTitle = document.querySelector(profileTitle),
    this._profileSubtitle = document.querySelector(profileSubtitle);
  }
  getUserInfo() {
    const dataUserInfo = {
        nameInput: this._profileTitle.textContent,
        jobInput: this._profileSubtitle.textContent
    }
    return dataUserInfo;
  }
  setUserInfo(userData) {
    this._profileTitle.textContent = userData.name;
    this._profileSubtitle.textContent = userData.about;
    this._profileAvatar.src = userData.avatar
  }
}