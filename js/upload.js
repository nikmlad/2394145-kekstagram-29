import { isEscapeKey } from "./util.js";
import { disableConfirmButton } from "./validation.js";

const uploadButton = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadCansel = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

const closeModal = () => {
  uploadForm.reset();
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.removeEventListener('input', disableConfirmButton);
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === commentField || document.activeElement === hashtagField;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && !isTextFieldFocused()){
    evt.preventDefault();
    closeModal();
  }
};

const onCancelClick = () => {
  closeModal();
};

// открытие окна с формой
uploadButton.addEventListener('change', () => {
  uploadModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadForm.addEventListener('input', disableConfirmButton);
  // событие закрытия по кнопке
  document.addEventListener('keydown', onDocumentKeydown);
  // событие закрытия по крестику
  uploadCansel.addEventListener('click', onCancelClick);

});






