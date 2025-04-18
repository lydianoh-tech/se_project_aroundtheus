import "./index.css";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards, FormValidatorObjects } from "../utils/constants.js";

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

const userInfo = new UserInfo({
  nameSelector: "#profile__title",
  jobSelector: "#profile__description",
});
const imagePopup = new PopupWithImage("#image__modal");
imagePopup.setEventListeners();

const profileFormPopup = new PopupWithForm("#profile__modal", (data) => {
  userInfo.setUserInfo({
    name: data.name,
    job: data.description,
  });
  profileFormPopup.close();
});

profileFormPopup.setEventListeners();

function createCard(data) {
  const card = new Card(data, "#cards__template", () => {
    imagePopup.open(data);
  });
  return card.generateCard();
}

const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      section.addItem(cardElement);
    },
  },
  "#cards__list"
);

section.renderItems();

profileEditButton.addEventListener("click", () => {
  const userData = userInfo.getUserInfo();
  profileFormPopup.setInputValues({
    name: userData.name,
    description: userData.job,
  });
  profileFormPopup.open();
});

addProfileButton.addEventListener("click", () => {
  addCardPopup.open();
});

// Universal form validators
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(FormValidatorObjects);

const addCardPopup = new PopupWithForm("#add__card-modal", (data) => {
  const cardElement = createCard({
    name: data.title,
    link: data.image,
  });
  section.addItem(cardElement);
  addCardPopup.close();

  // Disable the submit button after adding a card
  const formName = addCardForm.getAttribute("name");
  formValidators[formName].disableButton();
});

addCardPopup.setEventListeners();
