const express = require('express');
const TourController=require('../Controller/TourController')
const route = express.Router();
//tour route

route.post(`/addTour`,TourController.createTour);
route.get(`/getTours`,TourController.getTours)

module.exports=route