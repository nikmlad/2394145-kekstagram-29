const effects = {
  none: {
    filter: 'none'
  },

  chrome: {
    filter: 'grayscale',
    step: '0.1',
    mesure: '',
    min: '0',
    max: '1'
  },

  sepia: {
    filter: 'sepia',
    step: '0.1',
    mesure: '',
    min: '0',
    max: '1'
  },

  marvin: {
    filter: 'invert',
    step: '1',
    mesure: '%',
    min: '0',
    max: '100'
  },

  phobos: {
    filter: 'blur',
    step: '0.1',
    mesure: 'px',
    min: '0',
    max: '3'
  },

  heat: {
    filter: 'brightness',
    step: '0.1',
    mesure: '',
    min: '1',
    max: '3'
  }
};

export {effects};
