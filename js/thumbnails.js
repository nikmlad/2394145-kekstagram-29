import { photos } from "./data.js";
import { renderBigPicture } from "./full-photo.js";
const randomPictures = photos;
const templatePicture = document.querySelector('#picture').content;
const containerPictures = document.querySelector('.pictures');
const fragmentPictures = document.createDocumentFragment();


function renderThumbnails ()  {
  for (let i = 0; i < randomPictures.length; i++){
    const randomPicture = templatePicture.cloneNode(true);
    randomPicture.querySelector('.picture__img').src = randomPictures[i].url;
    randomPicture.querySelector('.picture__img').alt = randomPictures[i].description;
    randomPicture.querySelector('.picture__likes').textContent = randomPictures[i].likes;
    randomPicture.querySelector('.picture__comments').textContent = randomPictures[i].comments.length;
    randomPicture.querySelector('.picture').id = randomPictures[i].id;
    fragmentPictures.appendChild(randomPicture);
  }
  containerPictures.appendChild(fragmentPictures)
}

containerPictures.addEventListener('click', (evt) => {
  let thumbnail = evt.target.closest('.picture');
  if(thumbnail) {
    renderBigPicture(thumbnail.id)
  } else {
    return
  }
});

export {renderThumbnails}
