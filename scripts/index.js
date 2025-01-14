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
const profileForm = document.querySelector("#profile__form");
const modalCloseButton = profileModal.querySelector("#modal__close-icon");
const profileTitle = document.querySelector("#profile__title");
const profileDescription = document.querySelector("#profile__description");

const profileTitleInput = document.querySelector("#modal__title-input");
const profileDescriptionInput = document.querySelector(
  "#modal__description-input"
);

const addProfileButton = document.querySelector("#profile__add-button");

const profileEditForm = profileModal.querySelector("#modal__form");

//card modal
const cardsListElement = document.querySelector("#cards__list");
const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");

const cardModal = document.querySelector("#card__modal");
const cardModalForm = document.querySelector("#card__modal-form");
const addCardmodal = document.querySelector("#card__modal-title");
const closeCardModalButton = cardModal.querySelector("#card__modal-close-icon");
//image preview
const imageModal = document.querySelector("#image__modal");
const imageModalImage = imageModal.querySelector("#image__modal-image");
const imageModalTitle = imageModal.querySelector("#image__modal-title");

const imageCloseModalButton = imageModal.querySelector(
  "#image__modal_close-icon"
);
// Function to open the modal by adding the "modal_opened" class

function openModal(pop) {
  pop.classList.add("modal_opened");
}

// Function to close the modal by removing the "modal_opened" class
function closeModal(pop) {
  pop.classList.remove("modal_opened");
}

// Function to open the image modal, setting the image source, alt, and title
function openImageModal(imageSrc, imageTitle) {
  imageModalImage.src = imageSrc;

  imageModalImage.alt = imageTitle;
  imageModalTitle.textContent = imageTitle;
  openModal(imageModal);
}
// Function to close the modal
function closeModal(pop) {
  pop.classList.remove("modal_opened");
}

// Function to add a card element to the beginning of a container
function getCardElement(cardView, cardsListElement) {
  cardsListElement.prepend(cardView);
}
// Function to create and configure a card element based on provided data
function getCardView(data) {
  // Clone the card template
  const cardElement = cardTemplate.cloneNode(true);

  // Set card image source, alt text, and title
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;

  // Add like button toggle functionality
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  // Add functionality to open image modal on card image click
  cardImageElement.addEventListener("click", () => {
    openImageModal(data.link, data.name);
  });

  // Add functionality to delete the card
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  return cardElement;
}

// Function to handle profile edit form submission
function handleProfileEditSubmit(e) {
  e.preventDefault(); // Prevent form's default submission behavior

  // Update profile title and description with input values
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  // Close the profile modal
  closeModal(profileModal);
}

// Function to handle card addition form submission
function addCardFormSubmit(e) {
  e.preventDefault();

  // Get card data and create the card view
  const cardName = document.querySelector("#card__modal-name");
  const cardLink = document.querySelector("#card__modal-link");
  const CardInput = { name: cardName.value, link: cardLink.value };
  addCardmodal.content;
  // Add the new card to the container

  const cardElement = getCardView(CardInput);
  cardsListElement.prepend(cardElement);

  // Close the card modal

  cardModalForm.reset(); // Reset the form fields
  closeModal(cardModal); // Close the mod
}

// Event listener to open the profile edit modal with current values pre-filled
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileModal);
});

// Event listener to open the card addition modal
addProfileButton.addEventListener("click", () => {
  openModal(cardModal);
});
// Event listener to handle profile form submission
profileForm.addEventListener("submit", handleProfileEditSubmit);
// Event listener to handle card form submission
cardModalForm.addEventListener("submit", addCardFormSubmit);

// Event listener to close the card modal
closeCardModalButton.addEventListener("click", () => closeModal(cardModal));

// Event listener to close the profile modal
modalCloseButton.addEventListener("click", () => closeModal(profileModal));

// Event listener to close the image modal
imageCloseModalButton.addEventListener("click", () => closeModal(imageModal));

// Initialize cards on the page from a predefined list
initialCards.forEach((data) => {
  const cardView = getCardView(data); // Create a card element
  cardsListElement.prepend(cardView); // Add it to the container
});
