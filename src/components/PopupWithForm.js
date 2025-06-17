import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);

    this._form = this._popup.querySelector(".modal__form");
    this._inputList = this._form.querySelectorAll(".modal__input");
    this._handleFormSubmit = handleFormSubmit;

    this._submitButton = this._popup.querySelector(".modal__submit-button");
  }
  getForm() {
    return this._form;
  }
  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitBtnText;
    }
  }

  _getInputValues() {
    const values = {};
    this._inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
  setButtonText(text) {
    if (this._submitButton) {
      this._submitButton.textContent = text;
    }
  }

  getButtonText() {
    return this._submitButton ? this._submitButton.textContent : "";
  }
}
