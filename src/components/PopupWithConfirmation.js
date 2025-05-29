import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirm) {
    super(popupSelector);
    this._handleConfirm = handleConfirm;
    this._confirmButton = this._popup.querySelector(".modal__submit-button");
  }

  setEventListeners() {
    this._confirmButton.addEventListener("click", (e) => {
      e.preventDefault();
      this._handleConfirm();
    });
    super.setEventListeners();
  }
  setButtonText(text) {
    if (this._confirmButton) {
      this._confirmButton.textContent = text;
    }
  }
}
