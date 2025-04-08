export default class PopupWithImage {
  constructor(popupSelector) {
    super({ popupSelector });
    this._image = this._popup.querySelector(".modal__image-link");
    this._caption = this._popup.querySelector(".modal__image-title");
  }

  open({ name, link }) {
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}
