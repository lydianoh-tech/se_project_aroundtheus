import "./index.css";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, FormValidatorObjects } from "../utils/constants.js";
import FormApi from "../components/FormApi.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";

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

const api = new FormApi({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7fb1cc65-9300-4e6b-bc42-831d1e5f24f7",
    "Content-Type": "application/json",
  },
});

// Initialize user info
const userInfo = new UserInfo({
  nameSelector: "#profile__title",
  jobSelector: "#profile__description",
  avatarSelector: ".profile__image",
});

// Fetch user info and initial cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
    });

    const section = new Section(
      {
        items: cards,
        renderer: (item) => {
          const cardElement = createCard(item);
          section.addItem(cardElement);
        },
      },
      "#cards__list"
    );
    section.renderItems();
  })
  .catch((err) => {
    console.error("Error loading app data:", err);
  });

// Create card function
function createCard(data) {
  const card = new Card(
    data,
    "#cards__template",
    () => {
      imagePopup.open(data);
    },
    (cardId, cardElement) => {
      handleDeleteCard(cardId, cardElement);
    }
  );
  return card.generateCard();
}

// Handle delete card
const deleteCardPopup = new PopupWithConfirmation("#delete__card-modal", () => {
  api
    .deleteCard(cardToDeleteId)
    .then(() => {
      cardToDeleteElement.remove();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    });
});

deleteCardPopup.setEventListeners();

let cardToDeleteId = null;
let cardToDeleteElement = null;

function handleDeleteCard(cardId, cardElement) {
  cardToDeleteId = cardId;
  cardToDeleteElement = cardElement;
  deleteCardPopup.open();
}

function handleFormSubmit(popupInstance, apiMethod, successCallback) {
  popupInstance.setButtonText("Saving...");
  apiMethod
    .then((response) => {
      successCallback(response);
      popupInstance.close();
    })
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(() => {
      popupInstance.setButtonText("Save");
    });
}

// Profile Form Submission
const profileFormPopup = new PopupWithForm("#profile__modal", (data) => {
  handleFormSubmit(
    profileFormPopup,
    api.updateProfile({ name: data.name, about: data.description }),
    (userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
    }
  );
});
profileFormPopup.setEventListeners();

// Add Card Form Submission
const addCardPopup = new PopupWithForm("#add__card-modal", (data) => {
  handleFormSubmit(
    addCardPopup,
    api.addCard({ name: data.name, link: data.link }),
    (cardData) => {
      const cardElement = createCard(cardData);
      cardsListElement.prepend(cardElement);
    }
  );
});
addCardPopup.setEventListeners();

// Update Avatar Form Submission
const updateAvatarPopup = new PopupWithForm("#update__avatar-modal", (data) => {
  handleFormSubmit(
    updateAvatarPopup,
    api.updateAvatar({ avatar: data.avatar }),
    (userData) => {
      const avatarImage = document.querySelector(".profile__image");
      avatarImage.src = userData.avatar;
    }
  );
});
updateAvatarPopup.setEventListeners();

// Event listeners
document
  .querySelector("#profile__edit-button")
  .addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    profileFormPopup.setInputValues({
      name: userData.name,
      description: userData.job,
    });
    profileFormPopup.open();
  });

document.querySelector("#profile__add-button").addEventListener("click", () => {
  addCardPopup.open();
});

document
  .querySelector("#profile__avatar-edit-button")
  .addEventListener("click", () => {
    updateAvatarPopup.open();
  });

// Enable form validation
const profileFormValidator = new FormValidator(
  FormValidatorObjects,
  profileForm
);
const addCardFormValidator = new FormValidator(
  FormValidatorObjects,
  addCardForm
);
const updateAvatarFormValidator = new FormValidator(
  FormValidatorObjects,
  document.querySelector("#update__avatar-form")
);
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();
