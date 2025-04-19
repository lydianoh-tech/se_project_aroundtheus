!function(){"use strict";class e{constructor(e){this._popup=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this)}open(){this._popup.classList.add("modal_opened"),document.addEventListener("keydown",this._handleEscClose)}close(){this._popup.classList.remove("modal_opened"),document.removeEventListener("keydown",this._handleEscClose)}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popup.addEventListener("click",(e=>{(e.target.classList.contains("modal__close-icon")||e.target===this._popup)&&this.close()}))}}class t extends e{constructor(e,t){super(e),this._form=this._popup.querySelector(".modal__form"),this._inputList=this._form.querySelectorAll(".modal__input"),this._handleFormSubmit=t}_getInputValues(){const e={};return this._inputList.forEach((t=>{e[t.name]=t.value})),e}setInputValues(e){this._inputList.forEach((t=>{t.value=e[t.name]}))}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._handleFormSubmit(this._getInputValues()),this._form.reset(),this.close()}))}}class s{constructor(e,t,s){this._name=e.name,this._link=e.link,this._cardSelector=t,this._handleImageClick=s}_getTemplate(){return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(!0)}_setEventListeners(){this._cardImageElement.addEventListener("click",(()=>{this._handleImageClick(this._name,this._link)})),this._likeButton.addEventListener("click",(()=>{this._likeButton.classList.toggle("card__like-button_active")})),this._deleteButton.addEventListener("click",(()=>{this._element.remove(),this._element=null}))}generateCard(){return this._element=this._getTemplate(),this._cardImageElement=this._element.querySelector(".card__image"),this._likeButton=this._element.querySelector(".card__like-button"),this._deleteButton=this._element.querySelector(".card__delete-button"),this._element.querySelector(".card__title").textContent=this._name,this._cardImageElement.src=this._link,this._cardImageElement.alt=this._name,this._setEventListeners(),this._element}}class n{constructor(e,t){this.settings=e,this._formSelector=e.formSelector,this._inputSelector=e.inputSelector,this._submitButtonSelector=e.submitButtonSelector,this._inactiveButtonClass=e.inactiveButtonClass,this._inputErrorClass=e.inputErrorClass,this._errorClass=e.errorClass,this._formElement=t,this._inputList=Array.from(this._formElement.querySelectorAll(this._inputSelector)),this._submitButton=this._formElement.querySelector(this._submitButtonSelector)}_showError(e){const t=this._formElement.querySelector(`#${e.id}-error`);t&&(t.textContent=e.validationMessage,t.classList.add(this._errorClass)),e.classList.add(this._inputErrorClass)}_hideError(e){const t=this._formElement.querySelector(`#${e.id}-error`);t&&(t.textContent="",t.classList.remove(this._errorClass)),e.classList.remove(this._inputErrorClass)}_checkInputValidity(e){e.validity.valid?this._hideError(e):this._showError(e)}_toggleButtonState(){this._inputList.every((e=>e.validity.valid))?(console.log("did this fire too"),this._submitButton.classList.remove(this._inactiveButtonClass),this._submitButton.disabled=!1):this.disableButton()}disableButton(){this._submitButton.classList.add(this._inactiveButtonClass),this._submitButton.disabled=!0}_setEventListeners(){this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))}))}enableValidation(){this._formElement.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}resetValidation(){this._inputList.forEach((e=>this._hideError(e))),this._toggleButtonState()}}const o=document.querySelector("#profile__edit-button"),r=(document.querySelector("#profile__modal"),document.querySelector("#modal__profile-title"),document.querySelector("#profile__title"),document.querySelector("#profile__description"),document.querySelector("#profile__name-input"),document.querySelector("#profile__description-input"),document.querySelector("#profile__add-button")),i=(document.querySelector("#cards__list"),document.querySelector("#cards__template").content.querySelector(".card"),document.forms.profile__form,document.forms.card__form),a=(document.querySelector("#add__card-modal"),document.querySelector("#add__card-title"),document.querySelector("#add__card-name"),document.querySelector("#add__card-link"),document.querySelector("#image__modal")),l=(a.querySelector("#image__link"),a.querySelector("#image__title"),new class{constructor(e){let{nameSelector:t,jobSelector:s}=e;this._nameElement=document.querySelector(t),this._jobElement=document.querySelector(s)}getUserInfo(){return{name:this._nameElement.textContent,job:this._jobElement.textContent}}setUserInfo(e){let{name:t,job:s}=e;this._nameElement.textContent=t,this._jobElement.textContent=s}}({nameSelector:"#profile__title",jobSelector:"#profile__description"})),c=new class extends e{constructor(e){super(e),this._image=this._popup.querySelector(".modal__image-link"),this._caption=this._popup.querySelector(".modal__image-title")}open(e){let{name:t,link:s}=e;this._image.src=s,this._image.alt=t,this._caption.textContent=t,super.open()}}("#image__modal");c.setEventListeners();const _=new t("#profile__modal",(e=>{l.setUserInfo({name:e.name,job:e.description}),_.close()}));function u(e){return new s(e,"#cards__template",(()=>{c.open(e)})).generateCard()}_.setEventListeners();const m=new class{constructor(e,t){let{items:s,renderer:n}=e;this._items=s,this._renderer=n,this._container=document.querySelector(t)}renderItems(){this._items.forEach((e=>{this._renderer(e)}))}addItem(e){this._container.prepend(e)}}({items:[{name:"Yosemite Valley",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg"},{name:"Lake Louise",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg"},{name:"Bald Mountains",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg"},{name:"Latemar",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg"},{name:"Vanoise National Park",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg"},{name:"Lago di Braies",link:"https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg"}],renderer:e=>{const t=u(e);m.addItem(t)}},"#cards__list");m.renderItems(),o.addEventListener("click",(()=>{const e=l.getUserInfo();_.setInputValues({name:e.name,description:e.job}),_.open()})),r.addEventListener("click",(()=>{p.open()}));const d={};var h;h={formSelector:".modal__form",inputSelector:".modal__input",submitButtonSelector:".modal__submit-button",inactiveButtonClass:"modal__submit-button_type_disabled",inputErrorClass:"popup__input_type_error",errorClass:"modal__error"},Array.from(document.querySelectorAll(h.formSelector)).forEach((e=>{const t=new n(h,e),s=e.getAttribute("name");d[s]=t,t.enableValidation()}));const p=new t("#add__card-modal",(e=>{const t=u({name:e.title,link:e.image});m.addItem(t),p.close();const s=i.getAttribute("name");d[s].disableButton()}));p.setEventListeners()}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LDBCQUNqQkUsV0FBWSxnQkNrRUtFLE1BQU1DLEtBQUt2RSxTQUFTcUIsaUJBQWlCNEcsRUFBT3ZFLGVBQ3BEakMsU0FBUytCLElBQ2hCLE1BQU0wRSxFQUFZLElBQUk1RSxFQUFjMkUsRUFBUXpFLEdBQ3RDMkUsRUFBVzNFLEVBQVk0RSxhQUFhLFFBQzFDSixFQUFlRyxHQUFZRCxFQUMzQkEsRUFBVTFDLGtCQUFrQixJQU1oQyxNQUFNdUMsRUFBZSxJQUFJL0csRUFBYyxvQkFBcUJjLElBQzFELE1BQU0rRixFQUFjYixFQUFXLENBQzdCckYsS0FBTUcsRUFBS3VHLE1BQ1gvRixLQUFNUixFQUFLd0csUUFFYnJCLEVBQVFTLFFBQVFHLEdBQ2hCRSxFQUFhdkgsUUFHYixNQUFNMkgsRUFBV3ZDLEVBQVl3QyxhQUFhLFFBQzFDSixFQUFlRyxHQUFVNUMsZUFBZSxJQUcxQ3dDLEVBQWFsSCxtQiIsInNvdXJjZXMiOlsid2VicGFjazovL0Fyb3VuZCB0aGUgVVMvLi9zcmMvY29tcG9uZW50cy9Qb3B1cC5qcyIsIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoRm9ybS5qcyIsIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC5qcyIsIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL2NvbXBvbmVudHMvRm9ybVZhbGlkYXRvci5qcyIsIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL3V0aWxzL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL3BhZ2VzL2luZGV4LmpzIiwid2VicGFjazovL0Fyb3VuZCB0aGUgVVMvLi9zcmMvY29tcG9uZW50cy9Vc2VySW5mby5qcyIsIndlYnBhY2s6Ly9Bcm91bmQgdGhlIFVTLy4vc3JjL2NvbXBvbmVudHMvUG9wdXBXaXRoSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vQXJvdW5kIHRoZSBVUy8uL3NyYy9jb21wb25lbnRzL1NlY3Rpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXAge1xyXG4gIGNvbnN0cnVjdG9yKHBvcHVwU2VsZWN0b3IpIHtcclxuICAgIHRoaXMuX3BvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2hhbmRsZUVzY0Nsb3NlID0gdGhpcy5faGFuZGxlRXNjQ2xvc2UuYmluZCh0aGlzKTtcclxuICB9XHJcblxyXG4gIG9wZW4oKSB7XHJcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QuYWRkKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xyXG4gIH1cclxuXHJcbiAgY2xvc2UoKSB7XHJcbiAgICB0aGlzLl9wb3B1cC5jbGFzc0xpc3QucmVtb3ZlKFwibW9kYWxfb3BlbmVkXCIpO1xyXG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgdGhpcy5faGFuZGxlRXNjQ2xvc2UpO1xyXG4gIH1cclxuXHJcbiAgX2hhbmRsZUVzY0Nsb3NlKGV2dCkge1xyXG4gICAgaWYgKGV2dC5rZXkgPT09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgdGhpcy5jbG9zZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9wb3B1cC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2dCkgPT4ge1xyXG4gICAgICBpZiAoXHJcbiAgICAgICAgZXZ0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJtb2RhbF9fY2xvc2UtaWNvblwiKSB8fFxyXG4gICAgICAgIGV2dC50YXJnZXQgPT09IHRoaXMuX3BvcHVwXHJcbiAgICAgICkge1xyXG4gICAgICAgIHRoaXMuY2xvc2UoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoRm9ybSBleHRlbmRzIFBvcHVwIHtcclxuICBjb25zdHJ1Y3Rvcihwb3B1cFNlbGVjdG9yLCBoYW5kbGVGb3JtU3VibWl0KSB7XHJcbiAgICBzdXBlcihwb3B1cFNlbGVjdG9yKTtcclxuICAgIHRoaXMuX2Zvcm0gPSB0aGlzLl9wb3B1cC5xdWVyeVNlbGVjdG9yKFwiLm1vZGFsX19mb3JtXCIpO1xyXG4gICAgdGhpcy5faW5wdXRMaXN0ID0gdGhpcy5fZm9ybS5xdWVyeVNlbGVjdG9yQWxsKFwiLm1vZGFsX19pbnB1dFwiKTtcclxuICAgIHRoaXMuX2hhbmRsZUZvcm1TdWJtaXQgPSBoYW5kbGVGb3JtU3VibWl0O1xyXG4gIH1cclxuXHJcbiAgX2dldElucHV0VmFsdWVzKCkge1xyXG4gICAgY29uc3QgdmFsdWVzID0ge307XHJcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgdmFsdWVzW2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XHJcbiAgICB9KTtcclxuICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgfVxyXG5cclxuICBzZXRJbnB1dFZhbHVlcyhkYXRhKSB7XHJcbiAgICB0aGlzLl9pbnB1dExpc3QuZm9yRWFjaCgoaW5wdXQpID0+IHtcclxuICAgICAgaW5wdXQudmFsdWUgPSBkYXRhW2lucHV0Lm5hbWVdO1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICBzZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHN1cGVyLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcbiAgICB0aGlzLl9mb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgdGhpcy5faGFuZGxlRm9ybVN1Ym1pdCh0aGlzLl9nZXRJbnB1dFZhbHVlcygpKTtcclxuICAgICAgdGhpcy5fZm9ybS5yZXNldCgpO1xyXG4gICAgICB0aGlzLmNsb3NlKCk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyZCB7XHJcbiAgY29uc3RydWN0b3IoZGF0YSwgY2FyZFNlbGVjdG9yLCBoYW5kbGVJbWFnZUNsaWNrKSB7XHJcbiAgICB0aGlzLl9uYW1lID0gZGF0YS5uYW1lO1xyXG4gICAgdGhpcy5fbGluayA9IGRhdGEubGluaztcclxuICAgIHRoaXMuX2NhcmRTZWxlY3RvciA9IGNhcmRTZWxlY3RvcjtcclxuICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sgPSBoYW5kbGVJbWFnZUNsaWNrO1xyXG4gIH1cclxuICBfZ2V0VGVtcGxhdGUoKSB7XHJcbiAgICBjb25zdCBjYXJkRWxlbWVudCA9IGRvY3VtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKHRoaXMuX2NhcmRTZWxlY3RvcilcclxuICAgICAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpXHJcbiAgICAgIC5jbG9uZU5vZGUodHJ1ZSk7XHJcblxyXG4gICAgcmV0dXJuIGNhcmRFbGVtZW50O1xyXG4gIH1cclxuICBfc2V0RXZlbnRMaXN0ZW5lcnMoKSB7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2VFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2hhbmRsZUltYWdlQ2xpY2sodGhpcy5fbmFtZSwgdGhpcy5fbGluayk7XHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLl9saWtlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2xpa2VCdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImNhcmRfX2xpa2UtYnV0dG9uX2FjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnQucmVtb3ZlKCk7XHJcbiAgICAgIHRoaXMuX2VsZW1lbnQgPSBudWxsO1xyXG4gICAgfSk7XHJcbiAgfVxyXG4gIGdlbmVyYXRlQ2FyZCgpIHtcclxuICAgIHRoaXMuX2VsZW1lbnQgPSB0aGlzLl9nZXRUZW1wbGF0ZSgpO1xyXG4gICAgdGhpcy5fY2FyZEltYWdlRWxlbWVudCA9IHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX19pbWFnZVwiKTtcclxuICAgIHRoaXMuX2xpa2VCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fbGlrZS1idXR0b25cIik7XHJcbiAgICB0aGlzLl9kZWxldGVCdXR0b24gPSB0aGlzLl9lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2FyZF9fZGVsZXRlLWJ1dHRvblwiKTtcclxuICAgIHRoaXMuX2VsZW1lbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkX190aXRsZVwiKS50ZXh0Q29udGVudCA9IHRoaXMuX25hbWU7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2VFbGVtZW50LnNyYyA9IHRoaXMuX2xpbms7XHJcbiAgICB0aGlzLl9jYXJkSW1hZ2VFbGVtZW50LmFsdCA9IHRoaXMuX25hbWU7XHJcblxyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudDtcclxuICB9XHJcbn1cclxuZXhwb3J0IHsgQ2FyZCB9O1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBGb3JtVmFsaWRhdG9yIHtcclxuICBjb25zdHJ1Y3RvcihzZXR0aW5ncywgZm9ybUVsZW1lbnQpIHtcclxuICAgIHRoaXMuc2V0dGluZ3MgPSBzZXR0aW5ncztcclxuICAgIHRoaXMuX2Zvcm1TZWxlY3RvciA9IHNldHRpbmdzLmZvcm1TZWxlY3RvcjtcclxuICAgIHRoaXMuX2lucHV0U2VsZWN0b3IgPSBzZXR0aW5ncy5pbnB1dFNlbGVjdG9yO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uU2VsZWN0b3IgPSBzZXR0aW5ncy5zdWJtaXRCdXR0b25TZWxlY3RvcjtcclxuICAgIHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MgPSBzZXR0aW5ncy5pbmFjdGl2ZUJ1dHRvbkNsYXNzO1xyXG4gICAgdGhpcy5faW5wdXRFcnJvckNsYXNzID0gc2V0dGluZ3MuaW5wdXRFcnJvckNsYXNzO1xyXG4gICAgdGhpcy5fZXJyb3JDbGFzcyA9IHNldHRpbmdzLmVycm9yQ2xhc3M7XHJcbiAgICB0aGlzLl9mb3JtRWxlbWVudCA9IGZvcm1FbGVtZW50O1xyXG4gICAgdGhpcy5faW5wdXRMaXN0ID0gQXJyYXkuZnJvbShcclxuICAgICAgdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvckFsbCh0aGlzLl9pbnB1dFNlbGVjdG9yKVxyXG4gICAgKTtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbiA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvblNlbGVjdG9yXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgX3Nob3dFcnJvcihpbnB1dEVsZW1lbnQpIHtcclxuICAgIGNvbnN0IGVycm9yRWxlbWVudCA9IHRoaXMuX2Zvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIGAjJHtpbnB1dEVsZW1lbnQuaWR9LWVycm9yYFxyXG4gICAgKTtcclxuICAgIGlmIChlcnJvckVsZW1lbnQpIHtcclxuICAgICAgZXJyb3JFbGVtZW50LnRleHRDb250ZW50ID0gaW5wdXRFbGVtZW50LnZhbGlkYXRpb25NZXNzYWdlO1xyXG4gICAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLl9lcnJvckNsYXNzKTtcclxuICAgIH1cclxuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QuYWRkKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfaGlkZUVycm9yKGlucHV0RWxlbWVudCkge1xyXG4gICAgY29uc3QgZXJyb3JFbGVtZW50ID0gdGhpcy5fZm9ybUVsZW1lbnQucXVlcnlTZWxlY3RvcihcclxuICAgICAgYCMke2lucHV0RWxlbWVudC5pZH0tZXJyb3JgXHJcbiAgICApO1xyXG4gICAgaWYgKGVycm9yRWxlbWVudCkge1xyXG4gICAgICBlcnJvckVsZW1lbnQudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgICBlcnJvckVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLl9lcnJvckNsYXNzKTtcclxuICAgIH1cclxuICAgIGlucHV0RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2lucHV0RXJyb3JDbGFzcyk7XHJcbiAgfVxyXG5cclxuICBfY2hlY2tJbnB1dFZhbGlkaXR5KGlucHV0RWxlbWVudCkge1xyXG4gICAgaWYgKCFpbnB1dEVsZW1lbnQudmFsaWRpdHkudmFsaWQpIHtcclxuICAgICAgdGhpcy5fc2hvd0Vycm9yKGlucHV0RWxlbWVudCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9oaWRlRXJyb3IoaW5wdXRFbGVtZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIF90b2dnbGVCdXR0b25TdGF0ZSgpIHtcclxuICAgIGNvbnN0IGlzVmFsaWQgPSB0aGlzLl9pbnB1dExpc3QuZXZlcnkoXHJcbiAgICAgIChpbnB1dEVsZW1lbnQpID0+IGlucHV0RWxlbWVudC52YWxpZGl0eS52YWxpZFxyXG4gICAgKTtcclxuICAgIGlmIChpc1ZhbGlkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiZGlkIHRoaXMgZmlyZSB0b29cIik7XHJcbiAgICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgICB0aGlzLl9zdWJtaXRCdXR0b24uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUJ1dHRvbigpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgZGlzYWJsZUJ1dHRvbigpIHtcclxuICAgIHRoaXMuX3N1Ym1pdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKHRoaXMuX2luYWN0aXZlQnV0dG9uQ2xhc3MpO1xyXG4gICAgdGhpcy5fc3VibWl0QnV0dG9uLmRpc2FibGVkID0gdHJ1ZTtcclxuICB9XHJcblxyXG4gIF9zZXRFdmVudExpc3RlbmVycygpIHtcclxuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcblxyXG4gICAgdGhpcy5faW5wdXRMaXN0LmZvckVhY2goKGlucHV0RWxlbWVudCkgPT4ge1xyXG4gICAgICBpbnB1dEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsICgpID0+IHtcclxuICAgICAgICB0aGlzLl9jaGVja0lucHV0VmFsaWRpdHkoaW5wdXRFbGVtZW50KTtcclxuICAgICAgICB0aGlzLl90b2dnbGVCdXR0b25TdGF0ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgZW5hYmxlVmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2Zvcm1FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGV2dCkgPT4ge1xyXG4gICAgICBldnQucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5fc2V0RXZlbnRMaXN0ZW5lcnMoKTtcclxuICB9XHJcblxyXG4gIHJlc2V0VmFsaWRhdGlvbigpIHtcclxuICAgIHRoaXMuX2lucHV0TGlzdC5mb3JFYWNoKChpbnB1dEVsZW1lbnQpID0+IHRoaXMuX2hpZGVFcnJvcihpbnB1dEVsZW1lbnQpKTtcclxuICAgIHRoaXMuX3RvZ2dsZUJ1dHRvblN0YXRlKCk7XHJcbiAgfVxyXG59XHJcbmV4cG9ydCB7IEZvcm1WYWxpZGF0b3IgfTtcclxuIiwiY29uc3QgaW5pdGlhbENhcmRzID0gW1xyXG4gIHtcclxuICAgIG5hbWU6IFwiWW9zZW1pdGUgVmFsbGV5XCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QveW9zZW1pdGUuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxha2UgTG91aXNlXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvbGFrZS1sb3Vpc2UuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkJhbGQgTW91bnRhaW5zXCIsXHJcbiAgICBsaW5rOiBcImh0dHBzOi8vcHJhY3RpY3VtLWNvbnRlbnQuczMudXMtd2VzdC0xLmFtYXpvbmF3cy5jb20vc29mdHdhcmUtZW5naW5lZXIvYXJvdW5kLXByb2plY3QvYmFsZC1tb3VudGFpbnMuanBnXCIsXHJcbiAgfSxcclxuICB7XHJcbiAgICBuYW1lOiBcIkxhdGVtYXJcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC9sYXRlbWFyLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJWYW5vaXNlIE5hdGlvbmFsIFBhcmtcIixcclxuICAgIGxpbms6IFwiaHR0cHM6Ly9wcmFjdGljdW0tY29udGVudC5zMy51cy13ZXN0LTEuYW1hem9uYXdzLmNvbS9zb2Z0d2FyZS1lbmdpbmVlci9hcm91bmQtcHJvamVjdC92YW5vaXNlLmpwZ1wiLFxyXG4gIH0sXHJcbiAge1xyXG4gICAgbmFtZTogXCJMYWdvIGRpIEJyYWllc1wiLFxyXG4gICAgbGluazogXCJodHRwczovL3ByYWN0aWN1bS1jb250ZW50LnMzLnVzLXdlc3QtMS5hbWF6b25hd3MuY29tL3NvZnR3YXJlLWVuZ2luZWVyL2Fyb3VuZC1wcm9qZWN0L2xhZ28uanBnXCIsXHJcbiAgfSxcclxuXTtcclxuXHJcbmNvbnN0IEZvcm1WYWxpZGF0b3JPYmplY3RzID0ge1xyXG4gIGZvcm1TZWxlY3RvcjogXCIubW9kYWxfX2Zvcm1cIixcclxuICBpbnB1dFNlbGVjdG9yOiBcIi5tb2RhbF9faW5wdXRcIixcclxuICBzdWJtaXRCdXR0b25TZWxlY3RvcjogXCIubW9kYWxfX3N1Ym1pdC1idXR0b25cIixcclxuICBpbmFjdGl2ZUJ1dHRvbkNsYXNzOiBcIm1vZGFsX19zdWJtaXQtYnV0dG9uX3R5cGVfZGlzYWJsZWRcIixcclxuICBpbnB1dEVycm9yQ2xhc3M6IFwicG9wdXBfX2lucHV0X3R5cGVfZXJyb3JcIixcclxuICBlcnJvckNsYXNzOiBcIm1vZGFsX19lcnJvclwiLFxyXG59O1xyXG5leHBvcnQgeyBpbml0aWFsQ2FyZHMsIEZvcm1WYWxpZGF0b3JPYmplY3RzIH07XHJcbiIsImltcG9ydCBcIi4vaW5kZXguY3NzXCI7XHJcblxyXG5pbXBvcnQgU2VjdGlvbiBmcm9tIFwiLi4vY29tcG9uZW50cy9TZWN0aW9uLmpzXCI7XHJcbmltcG9ydCBQb3B1cFdpdGhJbWFnZSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhJbWFnZS5qc1wiO1xyXG5pbXBvcnQgUG9wdXBXaXRoRm9ybSBmcm9tIFwiLi4vY29tcG9uZW50cy9Qb3B1cFdpdGhGb3JtLmpzXCI7XHJcbmltcG9ydCBVc2VySW5mbyBmcm9tIFwiLi4vY29tcG9uZW50cy9Vc2VySW5mby5qc1wiO1xyXG5pbXBvcnQgQ2FyZCBmcm9tIFwiLi4vY29tcG9uZW50cy9DYXJkLmpzXCI7XHJcbmltcG9ydCBGb3JtVmFsaWRhdG9yIGZyb20gXCIuLi9jb21wb25lbnRzL0Zvcm1WYWxpZGF0b3IuanNcIjtcclxuaW1wb3J0IHsgaW5pdGlhbENhcmRzLCBGb3JtVmFsaWRhdG9yT2JqZWN0cyB9IGZyb20gXCIuLi91dGlscy9jb25zdGFudHMuanNcIjtcclxuXHJcbmNvbnN0IHByb2ZpbGVFZGl0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19lZGl0LWJ1dHRvblwiKTtcclxuY29uc3QgcHJvZmlsZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9maWxlX19tb2RhbFwiKTtcclxuY29uc3QgcHJvZmlsZU1vZGFsVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21vZGFsX19wcm9maWxlLXRpdGxlXCIpO1xyXG5cclxuY29uc3QgcHJvZmlsZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX3RpdGxlXCIpO1xyXG5jb25zdCBwcm9maWxlRGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2Rlc2NyaXB0aW9uXCIpO1xyXG5cclxuY29uc3QgcHJvZmlsZU5hbWVJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvZmlsZV9fbmFtZS1pbnB1dFwiKTtcclxuY29uc3QgcHJvZmlsZURlc2NyaXB0aW9uSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxyXG4gIFwiI3Byb2ZpbGVfX2Rlc2NyaXB0aW9uLWlucHV0XCJcclxuKTtcclxuXHJcbmNvbnN0IGFkZFByb2ZpbGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2ZpbGVfX2FkZC1idXR0b25cIik7XHJcblxyXG4vL2NhcmQgbW9kYWxcclxuY29uc3QgY2FyZHNMaXN0RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZHNfX2xpc3RcIik7XHJcbmNvbnN0IGNhcmRUZW1wbGF0ZSA9IGRvY3VtZW50XHJcbiAgLnF1ZXJ5U2VsZWN0b3IoXCIjY2FyZHNfX3RlbXBsYXRlXCIpXHJcbiAgLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5jYXJkXCIpO1xyXG5cclxuLy9RdWVyeSBEb20gZm9ybXNcclxuY29uc3QgcHJvZmlsZUZvcm0gPSBkb2N1bWVudC5mb3Jtcy5wcm9maWxlX19mb3JtO1xyXG5jb25zdCBhZGRDYXJkRm9ybSA9IGRvY3VtZW50LmZvcm1zLmNhcmRfX2Zvcm07XHJcblxyXG5jb25zdCBhZGRDYXJkTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZF9fY2FyZC1tb2RhbFwiKTtcclxuXHJcbmNvbnN0IGFkZENhcmRtb2RhbFRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRfX2NhcmQtdGl0bGVcIik7XHJcbmNvbnN0IGNhcmROYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGRfX2NhcmQtbmFtZVwiKTtcclxuY29uc3QgY2FyZExpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZF9fY2FyZC1saW5rXCIpO1xyXG5cclxuLy9pbWFnZSBwcmV2aWV3XHJcbmNvbnN0IGltYWdlTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2ltYWdlX19tb2RhbFwiKTtcclxuY29uc3QgaW1hZ2VMaW5rID0gaW1hZ2VNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2ltYWdlX19saW5rXCIpO1xyXG5jb25zdCBpbWFnZVRpdGxlID0gaW1hZ2VNb2RhbC5xdWVyeVNlbGVjdG9yKFwiI2ltYWdlX190aXRsZVwiKTtcclxuXHJcbmNvbnN0IHVzZXJJbmZvID0gbmV3IFVzZXJJbmZvKHtcclxuICBuYW1lU2VsZWN0b3I6IFwiI3Byb2ZpbGVfX3RpdGxlXCIsXHJcbiAgam9iU2VsZWN0b3I6IFwiI3Byb2ZpbGVfX2Rlc2NyaXB0aW9uXCIsXHJcbn0pO1xyXG5jb25zdCBpbWFnZVBvcHVwID0gbmV3IFBvcHVwV2l0aEltYWdlKFwiI2ltYWdlX19tb2RhbFwiKTtcclxuaW1hZ2VQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG5cclxuY29uc3QgcHJvZmlsZUZvcm1Qb3B1cCA9IG5ldyBQb3B1cFdpdGhGb3JtKFwiI3Byb2ZpbGVfX21vZGFsXCIsIChkYXRhKSA9PiB7XHJcbiAgdXNlckluZm8uc2V0VXNlckluZm8oe1xyXG4gICAgbmFtZTogZGF0YS5uYW1lLFxyXG4gICAgam9iOiBkYXRhLmRlc2NyaXB0aW9uLFxyXG4gIH0pO1xyXG4gIHByb2ZpbGVGb3JtUG9wdXAuY2xvc2UoKTtcclxufSk7XHJcblxyXG5wcm9maWxlRm9ybVBvcHVwLnNldEV2ZW50TGlzdGVuZXJzKCk7XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVDYXJkKGRhdGEpIHtcclxuICBjb25zdCBjYXJkID0gbmV3IENhcmQoZGF0YSwgXCIjY2FyZHNfX3RlbXBsYXRlXCIsICgpID0+IHtcclxuICAgIGltYWdlUG9wdXAub3BlbihkYXRhKTtcclxuICB9KTtcclxuICByZXR1cm4gY2FyZC5nZW5lcmF0ZUNhcmQoKTtcclxufVxyXG5cclxuY29uc3Qgc2VjdGlvbiA9IG5ldyBTZWN0aW9uKFxyXG4gIHtcclxuICAgIGl0ZW1zOiBpbml0aWFsQ2FyZHMsXHJcbiAgICByZW5kZXJlcjogKGl0ZW0pID0+IHtcclxuICAgICAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKGl0ZW0pO1xyXG4gICAgICBzZWN0aW9uLmFkZEl0ZW0oY2FyZEVsZW1lbnQpO1xyXG4gICAgfSxcclxuICB9LFxyXG4gIFwiI2NhcmRzX19saXN0XCJcclxuKTtcclxuXHJcbnNlY3Rpb24ucmVuZGVySXRlbXMoKTtcclxuXHJcbnByb2ZpbGVFZGl0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgY29uc3QgdXNlckRhdGEgPSB1c2VySW5mby5nZXRVc2VySW5mbygpO1xyXG4gIHByb2ZpbGVGb3JtUG9wdXAuc2V0SW5wdXRWYWx1ZXMoe1xyXG4gICAgbmFtZTogdXNlckRhdGEubmFtZSxcclxuICAgIGRlc2NyaXB0aW9uOiB1c2VyRGF0YS5qb2IsXHJcbiAgfSk7XHJcbiAgcHJvZmlsZUZvcm1Qb3B1cC5vcGVuKCk7XHJcbn0pO1xyXG5cclxuYWRkUHJvZmlsZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gIGFkZENhcmRQb3B1cC5vcGVuKCk7XHJcbn0pO1xyXG5cclxuLy8gVW5pdmVyc2FsIGZvcm0gdmFsaWRhdG9yc1xyXG5jb25zdCBmb3JtVmFsaWRhdG9ycyA9IHt9O1xyXG5cclxuY29uc3QgZW5hYmxlVmFsaWRhdGlvbiA9IChjb25maWcpID0+IHtcclxuICBjb25zdCBmb3JtTGlzdCA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChjb25maWcuZm9ybVNlbGVjdG9yKSk7XHJcbiAgZm9ybUxpc3QuZm9yRWFjaCgoZm9ybUVsZW1lbnQpID0+IHtcclxuICAgIGNvbnN0IHZhbGlkYXRvciA9IG5ldyBGb3JtVmFsaWRhdG9yKGNvbmZpZywgZm9ybUVsZW1lbnQpO1xyXG4gICAgY29uc3QgZm9ybU5hbWUgPSBmb3JtRWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xyXG4gICAgZm9ybVZhbGlkYXRvcnNbZm9ybU5hbWVdID0gdmFsaWRhdG9yO1xyXG4gICAgdmFsaWRhdG9yLmVuYWJsZVZhbGlkYXRpb24oKTtcclxuICB9KTtcclxufTtcclxuXHJcbmVuYWJsZVZhbGlkYXRpb24oRm9ybVZhbGlkYXRvck9iamVjdHMpO1xyXG5cclxuY29uc3QgYWRkQ2FyZFBvcHVwID0gbmV3IFBvcHVwV2l0aEZvcm0oXCIjYWRkX19jYXJkLW1vZGFsXCIsIChkYXRhKSA9PiB7XHJcbiAgY29uc3QgY2FyZEVsZW1lbnQgPSBjcmVhdGVDYXJkKHtcclxuICAgIG5hbWU6IGRhdGEudGl0bGUsXHJcbiAgICBsaW5rOiBkYXRhLmltYWdlLFxyXG4gIH0pO1xyXG4gIHNlY3Rpb24uYWRkSXRlbShjYXJkRWxlbWVudCk7XHJcbiAgYWRkQ2FyZFBvcHVwLmNsb3NlKCk7XHJcblxyXG4gIC8vIERpc2FibGUgdGhlIHN1Ym1pdCBidXR0b24gYWZ0ZXIgYWRkaW5nIGEgY2FyZFxyXG4gIGNvbnN0IGZvcm1OYW1lID0gYWRkQ2FyZEZvcm0uZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcclxuICBmb3JtVmFsaWRhdG9yc1tmb3JtTmFtZV0uZGlzYWJsZUJ1dHRvbigpO1xyXG59KTtcclxuXHJcbmFkZENhcmRQb3B1cC5zZXRFdmVudExpc3RlbmVycygpO1xyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVc2VySW5mbyB7XHJcbiAgY29uc3RydWN0b3IoeyBuYW1lU2VsZWN0b3IsIGpvYlNlbGVjdG9yIH0pIHtcclxuICAgIHRoaXMuX25hbWVFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihuYW1lU2VsZWN0b3IpO1xyXG4gICAgdGhpcy5fam9iRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioam9iU2VsZWN0b3IpO1xyXG4gIH1cclxuXHJcbiAgZ2V0VXNlckluZm8oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBuYW1lOiB0aGlzLl9uYW1lRWxlbWVudC50ZXh0Q29udGVudCxcclxuICAgICAgam9iOiB0aGlzLl9qb2JFbGVtZW50LnRleHRDb250ZW50LFxyXG4gICAgfTtcclxuICB9XHJcblxyXG4gIHNldFVzZXJJbmZvKHsgbmFtZSwgam9iIH0pIHtcclxuICAgIHRoaXMuX25hbWVFbGVtZW50LnRleHRDb250ZW50ID0gbmFtZTtcclxuICAgIHRoaXMuX2pvYkVsZW1lbnQudGV4dENvbnRlbnQgPSBqb2I7XHJcbiAgfVxyXG59XHJcbiIsImltcG9ydCBQb3B1cCBmcm9tIFwiLi9Qb3B1cC5qc1wiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUG9wdXBXaXRoSW1hZ2UgZXh0ZW5kcyBQb3B1cCB7XHJcbiAgY29uc3RydWN0b3IocG9wdXBTZWxlY3Rvcikge1xyXG4gICAgc3VwZXIocG9wdXBTZWxlY3Rvcik7XHJcbiAgICB0aGlzLl9pbWFnZSA9IHRoaXMuX3BvcHVwLnF1ZXJ5U2VsZWN0b3IoXCIubW9kYWxfX2ltYWdlLWxpbmtcIik7XHJcbiAgICB0aGlzLl9jYXB0aW9uID0gdGhpcy5fcG9wdXAucXVlcnlTZWxlY3RvcihcIi5tb2RhbF9faW1hZ2UtdGl0bGVcIik7XHJcbiAgfVxyXG5cclxuICBvcGVuKHsgbmFtZSwgbGluayB9KSB7XHJcbiAgICB0aGlzLl9pbWFnZS5zcmMgPSBsaW5rO1xyXG4gICAgdGhpcy5faW1hZ2UuYWx0ID0gbmFtZTtcclxuICAgIHRoaXMuX2NhcHRpb24udGV4dENvbnRlbnQgPSBuYW1lO1xyXG4gICAgc3VwZXIub3BlbigpO1xyXG4gIH1cclxufVxyXG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBTZWN0aW9uIHtcclxuICBjb25zdHJ1Y3Rvcih7IGl0ZW1zLCByZW5kZXJlciB9LCBjb250YWluZXJTZWxlY3Rvcikge1xyXG4gICAgdGhpcy5faXRlbXMgPSBpdGVtcztcclxuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XHJcbiAgICB0aGlzLl9jb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGNvbnRhaW5lclNlbGVjdG9yKTtcclxuICB9XHJcblxyXG4gIHJlbmRlckl0ZW1zKCkge1xyXG4gICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICB0aGlzLl9yZW5kZXJlcihpdGVtKTtcclxuICAgIH0pO1xyXG4gIH1cclxuXHJcbiAgYWRkSXRlbShlbGVtZW50KSB7XHJcbiAgICB0aGlzLl9jb250YWluZXIucHJlcGVuZChlbGVtZW50KTtcclxuICB9XHJcbn1cclxuIl0sIm5hbWVzIjpbIlBvcHVwIiwiY29uc3RydWN0b3IiLCJwb3B1cFNlbGVjdG9yIiwidGhpcyIsIl9wb3B1cCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsIl9oYW5kbGVFc2NDbG9zZSIsImJpbmQiLCJvcGVuIiwiY2xhc3NMaXN0IiwiYWRkIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsb3NlIiwicmVtb3ZlIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImV2dCIsImtleSIsInNldEV2ZW50TGlzdGVuZXJzIiwidGFyZ2V0IiwiY29udGFpbnMiLCJQb3B1cFdpdGhGb3JtIiwiaGFuZGxlRm9ybVN1Ym1pdCIsInN1cGVyIiwiX2Zvcm0iLCJfaW5wdXRMaXN0IiwicXVlcnlTZWxlY3RvckFsbCIsIl9oYW5kbGVGb3JtU3VibWl0IiwiX2dldElucHV0VmFsdWVzIiwidmFsdWVzIiwiZm9yRWFjaCIsImlucHV0IiwibmFtZSIsInZhbHVlIiwic2V0SW5wdXRWYWx1ZXMiLCJkYXRhIiwicHJldmVudERlZmF1bHQiLCJyZXNldCIsIkNhcmQiLCJjYXJkU2VsZWN0b3IiLCJoYW5kbGVJbWFnZUNsaWNrIiwiX25hbWUiLCJfbGluayIsImxpbmsiLCJfY2FyZFNlbGVjdG9yIiwiX2hhbmRsZUltYWdlQ2xpY2siLCJfZ2V0VGVtcGxhdGUiLCJjb250ZW50IiwiY2xvbmVOb2RlIiwiX3NldEV2ZW50TGlzdGVuZXJzIiwiX2NhcmRJbWFnZUVsZW1lbnQiLCJfbGlrZUJ1dHRvbiIsInRvZ2dsZSIsIl9kZWxldGVCdXR0b24iLCJfZWxlbWVudCIsImdlbmVyYXRlQ2FyZCIsInRleHRDb250ZW50Iiwic3JjIiwiYWx0IiwiRm9ybVZhbGlkYXRvciIsInNldHRpbmdzIiwiZm9ybUVsZW1lbnQiLCJfZm9ybVNlbGVjdG9yIiwiZm9ybVNlbGVjdG9yIiwiX2lucHV0U2VsZWN0b3IiLCJpbnB1dFNlbGVjdG9yIiwiX3N1Ym1pdEJ1dHRvblNlbGVjdG9yIiwic3VibWl0QnV0dG9uU2VsZWN0b3IiLCJfaW5hY3RpdmVCdXR0b25DbGFzcyIsImluYWN0aXZlQnV0dG9uQ2xhc3MiLCJfaW5wdXRFcnJvckNsYXNzIiwiaW5wdXRFcnJvckNsYXNzIiwiX2Vycm9yQ2xhc3MiLCJlcnJvckNsYXNzIiwiX2Zvcm1FbGVtZW50IiwiQXJyYXkiLCJmcm9tIiwiX3N1Ym1pdEJ1dHRvbiIsIl9zaG93RXJyb3IiLCJpbnB1dEVsZW1lbnQiLCJlcnJvckVsZW1lbnQiLCJpZCIsInZhbGlkYXRpb25NZXNzYWdlIiwiX2hpZGVFcnJvciIsIl9jaGVja0lucHV0VmFsaWRpdHkiLCJ2YWxpZGl0eSIsInZhbGlkIiwiX3RvZ2dsZUJ1dHRvblN0YXRlIiwiZXZlcnkiLCJjb25zb2xlIiwibG9nIiwiZGlzYWJsZWQiLCJkaXNhYmxlQnV0dG9uIiwiZW5hYmxlVmFsaWRhdGlvbiIsInJlc2V0VmFsaWRhdGlvbiIsInByb2ZpbGVFZGl0QnV0dG9uIiwiYWRkUHJvZmlsZUJ1dHRvbiIsImFkZENhcmRGb3JtIiwiZm9ybXMiLCJwcm9maWxlX19mb3JtIiwiY2FyZF9fZm9ybSIsImltYWdlTW9kYWwiLCJ1c2VySW5mbyIsIl9yZWYiLCJuYW1lU2VsZWN0b3IiLCJqb2JTZWxlY3RvciIsIl9uYW1lRWxlbWVudCIsIl9qb2JFbGVtZW50IiwiZ2V0VXNlckluZm8iLCJqb2IiLCJzZXRVc2VySW5mbyIsIl9yZWYyIiwiaW1hZ2VQb3B1cCIsIl9pbWFnZSIsIl9jYXB0aW9uIiwicHJvZmlsZUZvcm1Qb3B1cCIsImRlc2NyaXB0aW9uIiwiY3JlYXRlQ2FyZCIsInNlY3Rpb24iLCJjb250YWluZXJTZWxlY3RvciIsIml0ZW1zIiwicmVuZGVyZXIiLCJfaXRlbXMiLCJfcmVuZGVyZXIiLCJfY29udGFpbmVyIiwicmVuZGVySXRlbXMiLCJpdGVtIiwiYWRkSXRlbSIsImVsZW1lbnQiLCJwcmVwZW5kIiwiY2FyZEVsZW1lbnQiLCJ1c2VyRGF0YSIsImFkZENhcmRQb3B1cCIsImZvcm1WYWxpZGF0b3JzIiwiY29uZmlnIiwidmFsaWRhdG9yIiwiZm9ybU5hbWUiLCJnZXRBdHRyaWJ1dGUiLCJ0aXRsZSIsImltYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==