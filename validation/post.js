const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : '';
  data.image = !isEmpty(data.image) ? data.image : '';
  data.video = !isEmpty(data.video) ? data.video : '';

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = 'Post must be between 10 and 300 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = 'Text field is required';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = 'Image field is required';
  }

  if (Validator.isEmpty(data.video)) {
    errors.video = 'Video field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
