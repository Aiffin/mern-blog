const express = require('express');
const AuthController = require('../Controller/AuthController');
const auth = require('../middleware/auth')
const route = express.Router();

route.post(`/signup`,AuthController.signup)
route.post(`/login`,AuthController.login)
route.get(`/logout`,AuthController.logout)
route.get(`/refreshToken`,AuthController.refreshToken)
route.patch(`/resetPassword`,auth,AuthController.resetPassword)

module.exports=route