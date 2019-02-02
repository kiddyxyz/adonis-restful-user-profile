'use strict'

class UpdateUser {
  get rules () {
    return {
      name: 'required|alpha|min:3',
      email: 'required|email',
      phone: 'number'
    }
  }

  get messages () {
    return {
      'name.required': 'You must fill your name.',
      'name.alpha': 'Your name must be alphabet only.',
      'name.min': 'Your name must be minimum 3 characters',
      'email.required': 'You must provide a email address.',
      'email.email': 'You must provide a valid email address.',
      'phone.number': 'Phone number should be number only.',
    }
  }
}

module.exports = UpdateUser
