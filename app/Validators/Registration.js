'use strict'
const res = require('../Helper/Response');

class Registration {
  get rules () {
    return {
      name: 'required|alpha|min:3',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed|min:8|alpha_numeric|regex:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/',
      phone: 'required|number'
    }
  }

  get messages () {
    return {
      'name.required': 'You must fill your name.',
      'name.alpha': 'Your name must be alphabet only.',
      'name.min': 'Your name must be minimum 3 characters',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'email.unique': 'This email is already registered.',
      'password.required': 'You must provide a password.',
      'password.confirmed': 'Password and Password Confirmation should be same.',
      'password.alpha_numeric': 'Password should be alphanumeric only.',
      'password.min': 'Your min must be minimum 8 characters.',
      'password.regex': 'Password should contain at least one number and one alphabet.',
      'phone.required': 'You must provide a phone number.',
      'phone.number': 'Phone number should be number only.',
    }
  }
}

module.exports = Registration
