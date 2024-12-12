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
const profileEditButton = document.querySelector(".profile__edit-button");

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
// Function to open the modal
function openModal() {
  profileModal.classList.add("modal_open");
}

// Function to close the modal
function closeModal() {
  profileModal.classList.remove("modal_open");
}

// Event listeners
profileEditButton.addEventListener("click", openModal);

//Set  values
profileTitleInput.value = profileTitle.textContent;
profileDescriptionInput.value = profileDescription.textContent;

// Event listener to close modal
modalCloseButton.addEventListener("click", closeModal);
closeModal();

// Listener for form submission on profile edit form
profileEditForm = addEventListener("submit", (e) => {
  e.preventDefault(); // Prevent the default form submission behavior to avoid page reload

  // Update profile title and Description based on input field value
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;

  //Call close modal function
  closeModal();
});
