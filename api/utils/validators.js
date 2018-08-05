const Validator = require('validator')

const validators = {}

// isEmpty validation
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0)

// registration validation
validators.registerInput = ({ email, password, password2 }) => {
  let errors = {}

  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''
  password2 = !isEmpty(password2) ? password2 : ''

  // Email
  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }
  // Password
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }
  if (!Validator.isLength(password, { min: 8, max: 100 })) {
    errors.password = 'Password must be between 8 and 100 characters in length'
  }
  // Confirm Password
  if (Validator.isEmpty(password2)) {
    errors.password2 = 'Confirm password field is required'
  }
  if (!Validator.equals(password, password2)) {
    errors.password2 = 'Passwords must match'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

// login validation
validators.loginInput = ({ email, password }) => {
  let errors = {}
  email = !isEmpty(email) ? email : ''
  password = !isEmpty(password) ? password : ''

  if (!Validator.isEmail(email)) {
    errors.email = 'Email is invalid'
  }
  if (Validator.isEmpty(email)) {
    errors.email = 'Email field is required'
  }
  if (Validator.isEmpty(password)) {
    errors.password = 'Password field is required'
  }
  return {
    errors,
    isValid: isEmpty(errors)
  }
}

module.exports = { validators }
