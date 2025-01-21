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

const closeProfileButton = profileModal.querySelector("#profile__close-icon");
const profileTitle = document.querySelector("#modal__profile-title");
const profileDescription = document.querySelector("#profile__description");

const profileTitleInput = document.querySelector("#profile__title-input");
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

const addCardmodal = document.querySelector("#add__card-title");
const cardName = document.querySelector("#add__card-name");
const cardLink = document.querySelector("#add__card-link");
const addCardCloseButton = addCardModal.querySelector("#add__card-close-icon");
//image preview
const imageModal = document.querySelector("#image__modal");
const imageLink = imageModal.querySelector("#image__link");
const imageTitle = imageModal.querySelector("#image__title");

const imageCloseButton = imageModal.querySelector("#image__close-icon");

// Function to open the modal by adding the "modal_opened" class
function openModal(pop) {
  pop.classList.add("modal_opened");
}

// Function to close the modal by removing the "modal_opened" class
function closeModal(pop) {
  pop.classList.remove("modal_opened");
}

// Function to open the image modal, setting the image source, alt, and title
function openImageModal(data) {
  imageLink.src = data.link;

  imageLink.alt = data.name;
  imageTitle.textContent = data.name;
  openModal(imageModal);
}

// Function to add a card element to the beginning of a container
function getCardElement(ViewCard, cardsListElement) {
  cardsListElement.prepend(ViewCard);
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
    openImageModal(data);
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
function handleAddCardFormSubmi(e) {
  e.preventDefault();

  // Get card data and create the card view

  const cardInput = { name: cardName.value, link: cardLink.value };

  // Add the new card to the container

  const cardElement = getCardView(cardInput);
  cardsListElement.prepend(cardElement);

  // Close the card modal

  addCardForm.reset(); // Reset the form fields
  closeModal(addCardModal); // Close the modal
}

// Event listener to open the profile edit modal with current values pre-filled
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
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
addCardForm.addEventListener("submit", handleAddCardFormSubmi);

// Event listener to close the card modal
addCardCloseButton.addEventListener("click", () => closeModal(addCardModal));

// Event listener to close the profile modal
closeProfileButton.addEventListener("click", () => closeModal(profileModal));

// Event listener to close the image modal
imageCloseButton.addEventListener("click", () => closeModal(imageModal));

// Initialize cards on the page from a predefined list
initialCards.forEach((data) => {
  const viewCard = getCardView(data); // Create a card element
  cardsListElement.prepend(viewCard); // Add it to the container
});
