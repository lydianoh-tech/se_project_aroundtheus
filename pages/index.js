import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];
// Query DOM elements:edit profile
const profileEditButton = document.querySelector("#profile__edit-button");
const profileModal = document.querySelector("#profile__modal");
const profileModalTitle = document.querySelector("#modal__profile-title");

const profileName = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");

const profileNameInput = document.querySelector("#profile__name-input");
const profileDescriptionInput = document.querySelector(
  "#profile__description-input"
);

const addProfileButton = document.querySelector("#profile__add-button");

//card modal
const cardsListElement = document.querySelector("#cards__list");
const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");

//Query Dom forms
const profileForm = document.forms.profile__form;
const addCardForm = document.forms.card__form;

const addCardModal = document.querySelector("#add__card-modal");

const addCardmodalTitle = document.querySelector("#add__card-title");
const cardName = document.querySelector("#add__card-name");
const cardLink = document.querySelector("#add__card-link");

//image preview
const imageModal = document.querySelector("#image__modal");
const imageLink = imageModal.querySelector("#image__link");
const imageTitle = imageModal.querySelector("#image__title");

const FormValidatorObjects = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_type_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "modal__error",
};
const addFormValidator = new FormValidator(FormValidatorObjects, addCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(FormValidatorObjects, profileForm);
editFormValidator.enableValidation();

// Function to open the modal by adding the "modal_opened" class
function openModal(pop) {
  pop.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

// Function to close the modal by removing the "modal_opened" class
function closeModal(pop) {
  pop.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

// Function to open the image modal, setting the image source, alt, and title
function handleImageClick(name, link) {
  imageLink.src = link;

  imageLink.alt = name;
  imageTitle.textContent = name;
  openModal(imageModal);
}

// Close modal with "Esc" key
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened"); // Find the open modal
    closeModal(openModal);
  }
}

// Open modal and reset validation
document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// Function to add a card element to the beginning of a container
function getCardElement(viewCard, cardsListElement) {
  cardsListElement.prepend(viewCard);
}

// }
function getCardView(data) {
  const cardElement = new Card(data, "#cards__template", handleImageClick);

  return cardElement.generateCard();
}
// Function to handle profile edit form submission
function handleProfileEditSubmit(e) {
  e.preventDefault(); // Prevent form's default submission behavior

  // Update profile title and description with input values
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  // Close the profile modal
  closeModal(profileModal);
}

// Function to handle card addition form submission
function handleAddCardFormSubmit(e) {
  e.preventDefault();

  const cardInput = { name: cardName.value, link: cardLink.value };

  // Add the new card to the container
  renderCard(cardInput, "prepend"); // add `prepend` here to insert the card to the start of the section

  addCardForm.reset();
  // Close the card modal

  addCardForm.reset(); // Reset the form fields
  closeModal(addCardModal); // Close the modal
  addFormValidator.disableButton();
}

// Event listener to open the profile edit modal with current values pre-filled
profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

// Event listener to open the card addition modal
addProfileButton.addEventListener("click", () => {
  openModal(addCardModal);
});
// Event listener to handle profile form submission
profileForm.addEventListener("submit", handleProfileEditSubmit);
// Event listener to handle card form submission
addCardForm.addEventListener("submit", handleAddCardFormSubmit);

//Query all close buttons
const closeButtons = document.querySelectorAll("#close__icon");
closeButtons.forEach((button) => {
  // Find the closest popup only once
  const popup = button.closest(".modal");
  // Set the listener
  button.addEventListener("click", () => closeModal(popup));
});

// Initialize cards on the page from a predefined list
initialCards.forEach((data) => {
  initialCards.forEach((data) => {
    renderCard(data); // like this
  });

  function renderCard(item, method = "append") {
    const cardElement = getCardView(item);
    // Add the card into the section using the method
    cardsListElement[method](cardElement);
  }
});
function renderCard(item, method = "append") {
  const cardElement = getCardView(item);
  // Add the card into the section using the method
  cardsListElement[method](cardElement);
}
