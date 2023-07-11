
import { photos } from "./data.js"
import { isEscapeKey } from "./util.js";

const bigPicture = document.querySelector('.big-picture');
const likesCount = document.querySelector('.likes-count');
const commentsCount = document.querySelector('.comments-count');
const description = document.querySelector('.social__caption');
const comments = document.querySelector('.social__comments');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img ');
const pictures = document.querySelector('.pictures');
const commentTemplate = document.querySelector('.social__comment');
const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
const body = document.body;
const bigPictureCancel = document.querySelector('.big-picture__cancel');

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

//открытие окна большой картинки по клику
pictures.addEventListener('click', (evt) => {
  let thumbnail = evt.target.closest('.picture');
  //открытие окна полного размера
  bigPicture.classList.remove('hidden');
  // берем данные с картинки на которую нажали
  let photoItem = photos.find(x => x.id === +thumbnail.id);
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
});


// закрытие окна
function closeBigPicture () {
  bigPicture.classList.add('hidden');
}

// событие на крестик
bigPictureCancel.addEventListener('click', (evt) => {
  closeBigPicture();
})

// событие на ескейп
document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)){
    evt.preventDefault();
    closeBigPicture();
  }
})


export {}
