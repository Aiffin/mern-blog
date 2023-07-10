const express = require('express');
const AuthController = require('../Controller/AuthController');
const TourController=require('../Controller/TourController')
const auth = require('../middleware/auth')
const route = express.Router();

route.post(`/signup`,AuthController.signup)
route.post(`/login`,AuthController.login)
route.get(`/logout`,AuthController.logout)
route.get(`/refreshToken`,AuthController.refreshToken)
route.patch(`/resetPassword`,auth,AuthController.resetPassword)

//tour route

route.post(`/addTour`,TourController.createTour);
route.get(`/getTours`,TourController.getTours)


module.exports=route