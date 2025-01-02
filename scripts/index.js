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
// Query DOM elements
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
const profileEditForm = profileModal.querySelector("#modal__form");

const cardsListElement = document.querySelector("#cards__list");
const cardTemplate = document
  .querySelector("#cards__template")
  .content.querySelector(".card");
const addProfileButton = document.querySelector("#profile__add-button");
const cardModal = document.querySelector("#card__modal");
const cardModalForm = document.querySelector("#card__modal-form");
const closeCardModalButton = cardModal.querySelector("#card__modal-close-icon");

const imageModal = document.querySelector("#image__modal");
const imageModalImage = imageModal.querySelector("#image__modal-image");
const imageModalModalTitle = imageModal.querySelector("#image__modal-title");
const imageCloseModalButton = imageModal.querySelector(
  "#image__modal_close-icon"
);

// Function to open the modal
function openModal(pop) {
  pop.classList.add("modal_opened");
}
function openImageModal(imageSrc, imageTitle) {
  imageModalImage.src = imageSrc;
  imageModalImage.alt = imageAlt;
  imageModalModalTitle.textContent = imageTitle;
  openModal(imageModal);
}

// Function to close the modal
function closeModal(pop) {
  pop.classList.remove("modal_opened");
}
function getCardElement(cardElement, container) {
  container.prepend(cardElement);
}
function getCardView(data) {
  // Clone the template
  const cardElement = cardTemplate.cloneNode(true);

  // Access card elements and set data
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardTitleElement = cardElement.querySelector(".card__title");

  cardImageElement.src = data.link;
  cardImageElement.alt = data.name;
  cardTitleElement.textContent = data.name;
  const likeButton = cardElement.querySelector(".card__like-button");
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("#card__like_button-active;");
  });
  cardImageElement.addEventListener("click", () => {
    openImageModal(data.link, data.name);
  });
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}
//Function to handle profile edit submission
function handleProfileEditSubmit(e) {
  e.preventDefault(); // Prevent the default form submission behavior

  // Update profile title and description
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  // Close the modal
  closeModal(profileModal);
}

// Event listener for card form submission
cardModalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get form values
  const name = document.querySelector("#card__modal-title").value;
  const link = document.querySelector("#card__modal-link").value;

  // Create and add a new card
  const cardView = getCardView({
    name,
    link,
  });
  getCardElement(cardView);

  // Close the modal
  closeModal(cardModal);
});

// Event listeners
profileEditButton.addEventListener("click", () => {
  // Set initial input values
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;

  openModal(profileModal);
});

addProfileButton.addEventListener("click", () => {
  openModal(cardModal);
});
profileForm.addEventListener("submit", handleProfileEditSubmit);
closeCardModalButton.addEventListener("click", () => closeModal(cardModal));
modalCloseButton.addEventListener("click", () => closeModal(profileModal));
imageCloseModalButton.addEventListener("click", () => closeModal(imageModal));
// Add cards to the page
initialCards.forEach((data) => {
  const cardView = getCardView(data);

  getCardElement(cardView, cardsListElement);
});
