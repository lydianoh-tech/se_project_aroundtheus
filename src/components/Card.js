export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._data = data;
    this._likes = data.likes || [];
    this._ownerId = data.owner;
    this._userId = data.currentUserId;
    this._id = data._id || data.id;

    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }
  _updateLikesView() {
    if (this.isLiked())
      this._likeButton.classList.add("card__like-button_active");
    else
      this._likeButton.classList.toggle(
        "card__like-button_active",
        this.isLiked()
      );
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }
  isLiked() {
    return this._data.isLiked; // this way
  }

  setLikesInfo(data) {
    this._data = data;
    this._updateLikesView();
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this._id, this.isLiked());
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this._id, this._element);
    });
  }
  generateCard() {
    this._element = this._getTemplate();
    this._cardImageElement = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");

    this._element.querySelector(".card__title").textContent = this._name;
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;

    this._updateLikesView();
    this._setEventListeners();

    return this._element;
  }

  updateCard() {
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._titleElement.textContent = this._name;
    this._likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikes(likes) {
    this._likes = likes;
    this._updateCard();
  }
}
export { Card };
