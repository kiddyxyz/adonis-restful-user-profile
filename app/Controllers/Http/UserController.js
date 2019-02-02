'use strict'
const res = require('../../Helper/Response');
const { validate } = use('Validator')
const UserModel = use('App/Models/User')
const Hash = use('Hash')

class UserController {

    /**
     * @swagger
     * /login:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Login of Users
     *     parameters:
     *       - name: email
     *         description: Email of the user
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: Password of the user
     *         in: formData
     *         required: true
     *         type: string
     *         format: password 
     *     responses:
     *       200:
     *         description: Send succesfully message and return data of user
     *         example:
     *           values: {
                    id: 1,
                    name: "Hudya",
                    email: "kiddydhana@gmail.com",
                }
     *           message: Successfully login!
     */
    async login({request, response}){
        let user = await UserModel.findBy('email', request.body.email)
        if(!user){
            return res.badRequest('', 'Your email or password is invalid!', response);
        }
        
        const check = await Hash.verify(request.body.password, user.password)
        if(!check){
            return res.badRequest('', 'Your email or password is invalid!', response);
        }

        let data = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return res.ok(data, 'Successfully login!', response)
    }

    /**
     * @swagger
     * /login/phone:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Login of Users with Phone
     *     parameters:
     *       - name: phone
     *         description: Phone of the user
     *         in: formData
     *         required: true
     *         type: number
     *       - name: password
     *         description: Password of the user
     *         in: formData
     *         required: true
     *         type: string
     *         format: password
     *     responses:
     *       200:
     *         description: Send succesfully message and return data of user
     *         example:
     *           values: {
                    id: 1,
                    name: "Hudya",
                    email: "kiddydhana@gmail.com",
                }
     *           message: Successfully login!
     */
    async loginPhone({request, response}){
        let user = await UserModel.findBy('phone', request.body.phone)
        if(!user){
            return res.badRequest('', 'Your phone or password is invalid!', response);
        }
        
        const check = await Hash.verify(request.body.password, user.password)
        if(!check){
            return res.badRequest('', 'Your phone or password is invalid!', response);
        }

        let data = {
            id: user.id,
            name: user.name,
            email: user.email,
        }

        return res.ok(data, 'Successfully login!', response)
    }
    
    /**
     * @swagger
     * /register:
     *   post:
     *     tags:
     *       - Auth
     *     summary: User Register
     *     parameters:
     *       - name: name
     *         description: Name of User
     *         in: formData
     *         required: true
     *         type: string
     *       - name: email
     *         description: Email of User
     *         in: formData
     *         required: true
     *         type: string
     *       - name: password
     *         description: Password of the user, should be minimum 8 characters and using alphanumeric only.
     *         in: formData
     *         required: true
     *         type: string
     *         format: password
     *       - name: password_confirmation
     *         description: Confirmation Password of the user
     *         in: formData
     *         required: true
     *         type: string
     *         format: password
     *       - name: phone
     *         description: Phone of the user, should be unique also.
     *         in: formData
     *         required: true
     *         type: number
     *     responses:
     *       200:
     *         description: Send succesfully message
     *         example:
     *           values: {}
     *           message: Sucessfully register user!
     */
    async register({request, response}){
        const user = new UserModel()

        user.name = request.body.name;
        user.email = request.body.email;
        user.password = request.body.password;
        user.phone = request.body.phone;

        let command = await user.save()

        return res.ok({}, 'Sucessfully register user!', response)
    }

    /**
     * @swagger
     * /users/{id}:
     *   put:
     *     tags:
     *       - Users
     *     summary: User Update Data
     *     parameters:
     *       - name: id
     *         description: ID of the user
     *         in: path
     *         required: true
     *         type: number
     *       - name: name
     *         description: Name of the users
     *         in: formData
     *         required: true
     *         type: string
     *       - name: email
     *         description: Email of the user, should be unique also.
     *         in: formData
     *         required: true
     *         type: string
     *       - name: phone
     *         description: Phone of the user, should be unique also.
     *         in: formData
     *         required: true
     *         type: string
     *     responses:
     *       200:
     *         description: Send succesfully message
     *         example:
     *           values: {}
     *           message: Sucessfully update user profile
     */
    async update({request, response}){
        let validate = await this.updateValidation(request, response);
        if(validate){
            return res.badRequest('', validate, response);
        }
        
        let user = await UserModel.findBy('id', request.params.id)
        if(!user){
            return res.badRequest('', 'Wrong ID', response)
        }

        if(user.id.toString() !== request.params.id){
            return res.badRequest('', 'This email has been taken!', response)
        }

        let update = await UserModel.query().where('id', request.params.id)
            .update({ 
                name: request.body.name, 
                phone: request.body.phone,
                email: request.body.email
            })

        return res.ok({}, 'Sucessfully update user profile', response)
    }

    /**
     * @swagger
     * /users/change-password/{id}:
     *   put:
     *     tags:
     *       - Users
     *     summary: User Change Password
     *     parameters:
     *       - name: id
     *         description: ID of the user
     *         in: path
     *         required: true
     *         type: number
     *       - name: password
     *         description: New Password of the users, should be minimum 8 characters and using alphanumeric only.
     *         in: formData
     *         required: true
     *         type: string
     *         format: password
     *       - name: password_confirmation
     *         description: Password confirmation for new users.
     *         in: formData
     *         required: true
     *         type: string
     *         format: password
     *     responses:
     *       200:
     *         description: Send succesful message
     *         example:
     *           values: {}
     *           message: Sucessfully update password!
     */
    async updatePassword({request, response}){
        let validate = await this.updatePasswordValidation(request, response);
        if(validate){
            return res.badRequest('', validate, response);
        }

        let user = await UserModel.findBy('id', request.params.id)
        if(!user){
            return res.badRequest('', 'Wrong ID', response)
        }

        let update = await UserModel.query().where('id', request.params.id)
            .update({ password: await Hash.make(request.body.password) })

        return res.ok({}, 'Sucessfully update password!', response)
    }
}

module.exports = UserController
