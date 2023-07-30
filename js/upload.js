import { isEscapeKey } from './util.js';
import {disableConfirmButton, pristine } from './validation.js';
import {resetScale} from './scale.js';
import {resetEffects} from './effects.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import {sendData} from './api.js';

const uploadButton = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadCansel = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const uploadSubmit = document.querySelector('.img-upload__submit');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SUBMITTING: 'Отправляю...',
};

const toggleSubmitButton = (isDisabled) => {
  uploadSubmit.disabled = isDisabled;
  uploadSubmit.textContent = isDisabled ? SubmitButtonText.SUBMITTING : SubmitButtonText.IDLE;
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
  // событие закрытия по кнопке
  document.addEventListener('keydown', onDocumentKeydown);
  // событие закрытия по крестику
  uploadCansel.addEventListener('click', onCancelClick);
  // добавить событие дисейбла кнопки
  uploadForm.addEventListener('input', disableConfirmButton);
  uploadForm.addEventListener('submit', setOnFormSubmit);

});

// закрытие окна с формой
function closeModal () {
  uploadForm.reset();
  // сбросить ошибки пристин
  pristine.reset();
  // убрать событие дисейбла кнопки
  uploadForm.removeEventListener('input', disableConfirmButton);
  uploadModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  resetScale();
  resetEffects();
}

async function setOnFormSubmit (evt) {
  try {
    const isValid = pristine.validate();
    const data = new FormData(uploadForm);
    evt.preventDefault();
    if (isValid) {
      toggleSubmitButton(true);
      await sendData(data);
      toggleSubmitButton(false);
      closeModal();
      showSuccessMessage();
    }
  } catch {
    showErrorMessage();
    toggleSubmitButton(false);
  }
}

