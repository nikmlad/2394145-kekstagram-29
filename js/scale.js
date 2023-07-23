const scaleMinusButton = document.querySelector('.scale__control--smaller');
const scalePlusButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imageForScale = document.querySelector('.img-upload__preview img');

const STEP_SCALE = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const scaleImage = (value) => {
  imageForScale.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const scaleMinus = () => {
  const scaleIntValue = parseInt(scaleValue.value, 10);
  if (scaleIntValue > MIN_SCALE) {
    scaleValue.value = `${scaleIntValue - STEP_SCALE}%`;
    scaleImage(parseInt(scaleValue.value, 10));
  }
};

const scalePlus = () => {
  const scaleIntValue = parseInt(scaleValue.value, 10);
  if (scaleIntValue < MAX_SCALE) {
    scaleValue.value = `${scaleIntValue + STEP_SCALE}%`;
    scaleImage(parseInt(scaleValue.value, 10));
  }
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

scaleMinusButton.addEventListener('click', scaleMinus);
scalePlusButton.addEventListener('click', scalePlus);

export {resetScale};
