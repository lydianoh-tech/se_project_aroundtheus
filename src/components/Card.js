export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._data = data;
    this._id = data._id || data.id;
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });

    this._deleteButton.addEventListener("click", () => {
      if (this._id && this._handleDeleteClick) {
        this._handleDeleteClick(this._id, this._element);
      } else {
        console.error("Delete handler or card ID is missing.");
      }
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

    this._setEventListeners();

    return this._element;
  }
}

export { Card };
