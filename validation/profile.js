const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.mobilephone = !isEmpty(data.mobilephone) ? data.mobilephone : '';
  data.gender = !isEmpty(data.gender) ? data.gender : '';
  
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle needs to between 2 and 40 characters';
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Profile handle is required';
  }

  if (!Validator.isEmail(data.email)){
    errors.email = 'Email is invalid';
  }

  //if (Validator.isEmpty(data.email)){
    //errors.email = 'Email field is required';
  //}

  //if (!Validator.isLength(data.mobilephone, { min: 10, max: 10 })) {
    //errors.mobilephone = '10 digit phone number is required';
  //}
    //if (Validator.isEmpty(data.mobilephone)) {
    //errors.mobilephone = 'Mobile phone field is required';
  //}

  //if (Validator.isEmpty(data.gender)) {
    //errors.gender = 'gender field is required';
  //}


  if (!isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = 'Not a valid URL';
    }
  }

   return {
    errors,
    isValid: isEmpty(errors)
  };
};