'use strict'

class UpdateUserPassword {
  get rules () {
    return {
      password: 'required|confirmed|min:8|alpha_numeric|regex:/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/',
    }
  }

  get messages() {
    return {
      'password.required': 'You must provide a password.',
      'password.confirmed': 'Password and Password Confirmation should be same.',
      'password.alpha_numeric': 'Password should be alphanumeric only.',
      'password.min': 'Your min must be minimum 8 characters.',
      'password.regex': 'Password should contain at least one number and one alphabet.',
    }
  }
}

module.exports = UpdateUserPassword
