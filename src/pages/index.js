import "./index.css";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, FormValidatorObjects } from "../utils/constants.js";
import Api from "../components/Api.js";
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

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1c65c6f1-abdd-470a-ae4d-370153ad05d9",
    "Content-Type": "application/json",
  },
});

// Initialize user info
const userInfo = new UserInfo({
  nameSelector: "#profile__title",
  jobSelector: "#profile__description",
  avatarSelector: ".profile__image",
});
function createCard(data) {
  const cardData = { ...data, currentUserId: userInfo.getUserId() };

  const card = new Card(
    cardData,
    "#cards__template",

    (name, link) => {
      imagePopup.open({ name, link });
    },

    handleDeleteCard,

    (cardId, isLiked) => {
      const apiMethod = isLiked ? api.unlikeCard(cardId) : api.likeCard(cardId);
      return apiMethod
        .then((updatedCard) => {
          card.setLikesInfo(updatedCard);
        })
        .catch((err) => {
          console.error("Error liking card:", err);
        });
    }
  );

  return card.generateCard();
}

// Create image popup instance
const imagePopup = new PopupWithImage("#image__modal");
imagePopup.setEventListeners();

let section;

// Fetch user info and initial cards
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
      avatar: userData.avatar,
      id: userData._id,
    });

    section = new Section(
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

const deleteCardPopup = new PopupWithConfirmation("#delete__card-modal", () => {
  api
    .deleteCard(cardToDeleteId)
    .then(() => {
      cardToDeleteElement.remove();
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    })
    .finally(() => {
      deleteCardPopup.setButtonText("Yes");
    });
  console.log(cardToDeleteId);
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
  popupInstance.renderLoading(true);
  apiMethod
    .then((response) => {
      successCallback(response);
      popupInstance.close();
    })
    .catch((err) => {
      console.error("Error:", err);
    })
    .finally(() => {
      popupInstance.renderLoading(false);
    });
}
function handleAvatarFormSubmit({ avatar }) {
  api
    .setUserAvatar(avatar)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
      updateAvatarPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}
function handleProfileUpdate({ name, description }) {
  api
    .updateProfile({ name, about: description })
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
        avatar: res.avatar,
        id: res._id,
      });
      profileFormPopup.close();
    })
    .catch((err) => {
      console.error(err);
    });
}

// Profile Form Submission
const profileFormPopup = new PopupWithForm("#profile__modal", (data) => {
  handleFormSubmit(
    profileFormPopup,
    api.updateProfile({ name: data.name, about: data.description }),
    (userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        job: userData.about,
        avatar: userData.avatar,
        id: userData._id,
      });
    }
  );
});
profileFormPopup.setEventListeners();

// Add Card Form Submission
const addCardPopup = new PopupWithForm("#add__card-modal", (data) => {
  handleFormSubmit(
    addCardPopup,
    api.addCard({ name: data.title, link: data.image }),
    (cardData) => {
      const cardElement = createCard(cardData);
      section.addItem(cardElement);
      addCardForm.reset(); // reset
      addCardFormValidator.disableButton(); // disable
    }
  );
});

addCardPopup.setEventListeners();

// Update Avatar Form Submission
const updateAvatarPopup = new PopupWithForm("#update__avatar-modal", (data) => {
  handleFormSubmit(
    updateAvatarPopup,
    api.updateAvatar(data.avatar),
    (userData) => {
      userInfo.setUserAvatar(userData.avatar);
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

const avatarFormButton = document.querySelector(".profile__avatar-container");

avatarFormButton.addEventListener("click", () => {
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
