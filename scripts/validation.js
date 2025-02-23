const objects = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_type_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// Show input error message
function showInputError(formEle, inputEle, { inputErrorClass, errorClass }) {
  const errorMessageEle = formEle.querySelector(`#${inputEle.id}-error`);
  if (errorMessageEle) {
    errorMessageEle.textContent = inputEle.validationMessage;
    errorMessageEle.classList.add(errorClass);
  }
  inputEle.classList.add(inputErrorClass);
}

// Hide input error message
function hideInputError(formEle, inputEle, { inputErrorClass, errorClass }) {
  const errorMessageEle = formEle.querySelector(`#${inputEle.id}-error`);
  if (errorMessageEle) {
    errorMessageEle.textContent = "";
    errorMessageEle.classList.remove(errorClass);
  }
  inputEle.classList.remove(inputErrorClass);
}

// Check validity of input field
function checkInputValidity(formEle, inputEle, options) {
  if (!inputEle.validity.valid) {
    showInputError(formEle, inputEle, options);
  } else {
    hideInputError(formEle, inputEle, options);
  }
}

// Check if any input field is invalid
function hasInvalidInput(inputList) {
  return inputList.some((inputEle) => !inputEle.validity.valid);
}

// Enable/Disable submit button based on input validity
function toggleButtonState(inputList, buttonEle, options) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonEle, options);
  } else {
    buttonEle.disabled = false;
    buttonEle.classList.remove(options.inactiveButtonClass);
  }
}

// Disable the submit button
function disableButton(submitButton, options) {
  submitButton.disabled = true;
  submitButton.classList.add(options.inactiveButtonClass);
}

// Reset validation when reopening modal
function resetValidation(formEle, options) {
  const inputList = Array.from(formEle.querySelectorAll(options.inputSelector));
  inputList.forEach((inputEle) => {
    hideInputError(formEle, inputEle, options);
  });

  const buttonEle = formEle.querySelector(options.submitButtonSelector);
  disableButton(buttonEle, options);
}

// Add event listeners to form inputs
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

// Enable validation on forms
function enableValidation(options) {
  const formList = document.querySelectorAll(options.formSelector);
  formList.forEach((formEle) => {
    formEle.addEventListener("submit", (evt) => {
      evt.preventDefault();
      if (
        hasInvalidInput([...formEle.querySelectorAll(options.inputSelector)])
      ) {
        return;
      }
      console.log("Form submitted successfully!");
    });
    setEventListeners(formEle, options);
  });
}

// Open modal and reset validation
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// Close modal with "Esc" key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    document.querySelectorAll(".modal").forEach((modal) => {
      closeModal(modal);
    });
  }
});

// Function to close the modal
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

// Enable validation
enableValidation(objects);
