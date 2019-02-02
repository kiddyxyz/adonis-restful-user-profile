'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.on('/').render('welcome')

Route.group(() => {
    Route.get('/', async ({request}) => {
        return "API Server : v1 with Adonis JS";
    })
}).prefix('api/v1')

Route.group(() => {
    Route.post('/login', 'UserController.login')
    Route.post('/login/phone', 'UserController.loginPhone')
    Route.post('/register', 'UserController.register').validator('Registration')
}).prefix('api/v1')

//Users
Route.group(() => {
    Route.get('/:id', 'UserController.show')
    Route.put('/:id', 'UserController.update').validator('UpdateUser')
    Route.put('change-password/:id', 'UserController.updatePassword').validator('UpdateUserPassword')
}).prefix('api/v1/users')
