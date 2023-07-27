import { renderThumbnails } from './thumbnails.js';
import { getData, sendData } from './api.js';
import {setOnFormSubmit, closeModal} from './upload.js';
import { showAlert } from './util.js';
import {showErrorMessage, showSuccessMessage} from './message.js';
import { setDataForPhoto } from './full-photo.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

try {
  const data = await getData();
  renderThumbnails(data);
  setDataForPhoto(data);

} catch (err) {
  showAlert(err.message);
}
