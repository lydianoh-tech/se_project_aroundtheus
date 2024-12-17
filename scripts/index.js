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
// Query  DOM elements
const profileEditButton = document.querySelector("#profile__edit-button");

const profileModal = document.querySelector("#modal");
const modalCloseButton = document.querySelector("#modal__close-icon");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#modal__title-input");
const profileDescriptionInput = document.querySelector(
  "#modal__description-input"
);
// Query element from block element
const profileEditForm = profileModal.querySelector("#modal__form");

const cardsListElement = document.querySelector("#cards__list");
const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");

function openModal() {
  profileModal.classList.add("modal_opened");
}

// Function to close the modal
function closeModal() {
  profileModal.classList.remove("modal_opened");
}
function getCardElement(data) {
  // Clone the template
  const cardElement = cardTemplate.cloneNode(true);

  // Access card elements and set data
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  // Return the populated card element
  return cardElement;
}

//Function to handle profile edit submission
function handleProfileEditSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior to avoid page reload

  // Update profile title and description based on input field values
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal();
}

// Event listeners
profileEditButton.addEventListener("click", () => {
  // Set initial input values
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  profileModal.classList.add("modal_opened");
});

modalCloseButton.addEventListener("click", closeModal);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Adding cards to the page
initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardsListElement.append(cardElement);
});
