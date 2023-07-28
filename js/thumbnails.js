import { renderBigPicture, setDataForPhoto } from './full-photo.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const templatePicture = document.querySelector('#picture').content;
const containerPictures = document.querySelector('.pictures');
const fragmentPictures = document.createDocumentFragment();

async function renderThumbnails () {
  try {
    const randomPictures = await getData();
    setDataForPhoto(randomPictures);
    for (let i = 0; i < randomPictures.length; i++){
      const randomPicture = templatePicture.cloneNode(true);
      randomPicture.querySelector('.picture__img').src = randomPictures[i].url;
      randomPicture.querySelector('.picture__img').alt = randomPictures[i].description;
      randomPicture.querySelector('.picture__likes').textContent = randomPictures[i].likes;
      randomPicture.querySelector('.picture__comments').textContent = randomPictures[i].comments.length;
      randomPicture.querySelector('.picture').id = randomPictures[i].id;
      fragmentPictures.appendChild(randomPicture);
    }
    containerPictures.appendChild(fragmentPictures);

  } catch (err) {
    showAlert(err.message);
  }

}
// открытие большой картинки
containerPictures.addEventListener('click', (evt) => {
  const thumbnail = evt.target.closest('.picture');
  if(thumbnail) {
    renderBigPicture(thumbnail.id);
    evt.preventDefault();
  }
});

export {renderThumbnails};
