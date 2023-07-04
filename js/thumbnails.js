import { photos } from "./data.js";
const randomPictures = photos;
const templatePicture = document.querySelector('#picture').content;
const containerPictures = document.querySelector('.pictures');

const fragmentPictures = document.createDocumentFragment();

for (let i = 0; i < photos.length; i++){
  const randomPicture = templatePicture.cloneNode(true);

  randomPicture.querySelector('.picture__img').src = photos[i].url;
  randomPicture.querySelector('.picture__img').alt = photos[i].description;
  randomPicture.querySelector('.picture__likes').textContent = photos[i].likes;
  randomPicture.querySelector('.picture__comments').textContent = photos[i].comments.length;

  fragmentPictures.appendChild(randomPicture);
}

containerPictures.appendChild(fragmentPictures)

export {fragmentPictures}
