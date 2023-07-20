import { isEscapeKey } from './util.js';
import {disableConfirmButton, pristine } from './validation.js';

const uploadButton = document.querySelector('.img-upload__input');
const uploadModal = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('.img-upload__form');
const uploadCansel = document.querySelector('.img-upload__cancel');
const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');

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
}
