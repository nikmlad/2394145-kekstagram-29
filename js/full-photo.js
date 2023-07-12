
import { photos } from "./data.js"
import { isEscapeKey } from "./util.js";

const bigPicture = document.querySelector('.big-picture');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const description = document.querySelector('.social__caption');
const comments = document.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img ');
const commentTemplate = document.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.body;
const bigPictureCancel = document.querySelector('.big-picture__cancel');
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
}
const onCancelClick = (evt) => {
  closeBigPicture();
}

// генерим комментарии
function commentsCreate (photoItem) {
const commentFragment = document.createDocumentFragment();
//очищаем комментарии в данной разметке
comments.innerHTML = ''
//создаем новые комментарии
for (let i = 0; i < photoItem.comments.length; i++) {
  let comment = commentTemplate.cloneNode(true);
  comment.querySelector('img').src = photoItem.comments[i].avatar
  comment.querySelector('img').alt = photoItem.comments[i].name
  comment.querySelector('p').textContent = photoItem.comments[i].message
  commentFragment.appendChild(comment)
}
// вставляем новые комментарии
comments.appendChild(commentFragment)
}

// закрытие окна
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.removeEventListener('keydown', onDocumentKeydown);
  //containerPictures.removeEventListener('click', onContainerPicturesClick);
  bigPictureCancel.removeEventListener('click', onCancelClick)
  body.classList.remove('modal-open');
}

function renderBigPicture (thumbnailId) {
  //открытие окна полного размера
  bigPicture.classList.remove('hidden');
  // берем данные с картинки на которую нажали
  let photoItem = photos.find(x => x.id === +thumbnailId);
  // заполняем окно данными
  bigPictureImg.src = photoItem.url;
  likesCount.textContent = photoItem.likes;
  commentsCount.textContent = photoItem.comments.length;
  description.textContent = photoItem.description;
  // вызов функции создания комментариев
  commentsCreate(photoItem);
  // временно до следующего задания
  socialCommentCount.classList.add('hidden')
  commentsLoader.classList.add('hidden')
  // убираем прокрутку задника
  body.classList.add('modal-open')

  // событие на крестик
bigPictureCancel.addEventListener('click', onCancelClick)

// событие на ескейп
document.addEventListener('keydown', onDocumentKeydown)
};

export {renderBigPicture}
