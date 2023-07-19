const hashtagField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');
const submitButton = document.querySelector('.img-upload__submit');

const hashtagArray = () => hashtagField.value.split(' ').filter(Boolean);

const HASHTAG_TEMPLATE = /^#[a-zа-яё0-9]{1,19}$/i
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAG_AMOUNTH = 5;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper-error',
  successClass: 'img-upload__field-wrapper-success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__field-error'
})

//Проверка комментария
const validateComment = () => commentField.value.length <= MAX_COMMENT_LENGTH;
// Проверка кол-ва хештегов
const validateHashtagCount = () => hashtagArray().length <= MAX_HASHTAG_AMOUNTH;
// Проверка хештега по шаблону
const validateHashtag = () => hashtagArray().every((elem) => HASHTAG_TEMPLATE.test(elem));

// Поиск одинаковых хештегов
const validateHashtagSame = () => {
  const hashtagArr = hashtagArray();
    for (let i = 0; i < hashtagArr.length; i++) {
      let count = 0;
      for (let j = 0; j < hashtagArr.length; j++){
        if (hashtagArr[i] === hashtagArr[j]) {
          count++;
        }
      }
      if (count >= 2){
        return false;
      }
    }
  return true
};

pristine.addValidator(hashtagField, validateHashtag, 'Ошибка в хештеге');
pristine.addValidator(hashtagField, validateHashtagCount, 'Слишком много хештегов');
pristine.addValidator(hashtagField, validateHashtagSame, 'Одинаковые хештеги');
pristine.addValidator(commentField, validateComment, 'Слишком длинный комментарий');

// дизейбл кнопки про ошибках валидации
const disableConfirmButton = () => {
  if (!pristine.validate()) {
    submitButton.disabled = true
  } else {
    submitButton.disabled = false
  }
}

export {disableConfirmButton}
