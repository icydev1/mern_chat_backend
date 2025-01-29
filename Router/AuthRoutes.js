const { signup, login, getProfile } = require('../Controller/AuthController');
const ensureAuthenticated = require('../Middleware/Auth');
const { signupValidation, loginValidation } = require('../Middleware/AuthValidation');

const Router = require('express').Router();


Router.post('/login' , loginValidation , login)


Router.post('/signup', signupValidation , signup) 

Router.get('/get-profile', ensureAuthenticated , getProfile) 

module.exports = Router;