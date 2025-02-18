const objects = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "modal__error",
};

function setEventListeners(formEle, options) {
  const inputList = Array.from(formEle.querySelectorAll(options.inputSelector));
  const buttonEle = formEle.querySelector(options.submitButtonSelector);

  toggleButtonState(inputList, buttonEle, options);

  inputList.forEach((inputEle) => {
    inputEle.addEventListener("input", function () {
      checkInputValidity(formEle, inputEle, options);
      toggleButtonState(inputList, buttonEle, options);
    });
  });
}

function enableValidation(options) {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach((formEle) => {
    formEle.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEle, options);
  });
}

function showInputError(formEle, inputEle, { inputErrorClass, errorClass }) {
  const errorMessageEle = formEle.querySelector(`#${inputEle.id}-error`);
  if (errorMessageEle) {
    errorMessageEle.classList.add(errorClass);
    errorMessageEle.textContent = inputEle.validationMessage;
  }
  inputEle.classList.add(inputErrorClass);
}

function hideInputError(formEle, inputEle, { inputErrorClass, errorClass }) {
  const errorMessageEle = formEle.querySelector(`#${inputEle.id}-error`);
  if (errorMessageEle) {
    errorMessageEle.textContent = "";
    errorMessageEle.classList.remove(errorClass);
  }
  inputEle.classList.remove(inputErrorClass);
}

function checkInputValidity(formEle, inputEle, options) {
  if (!inputEle.validity.valid) {
    showInputError(formEle, inputEle, options);
  } else {
    hideInputError(formEle, inputEle, options);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputEle) => !inputEle.validity.valid);
}

function toggleButtonState(inputList, buttonEle, options) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEle, options);
  } else {
    buttonEle.disabled = false;
    buttonEle.classList.remove(options.inactiveButtonClass);
  }
}

function disableButton(submitButton, options) {
  submitButton.disabled = true;
  submitButton.classList.add(options.inactiveButtonClass);
}

function resetValidation(formEle, options) {
  const inputList = Array.from(formEle.querySelectorAll(options.inputSelector));
  inputList.forEach((inputEle) => {
    hideInputError(formEle, inputEle, options);
  });

  const buttonEle = formEle.querySelector(options.submitButtonSelector);
  toggleButtonState(inputList, buttonEle, options);
}

// Initialize validation
enableValidation(objects);
