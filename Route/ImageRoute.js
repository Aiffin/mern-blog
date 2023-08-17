const express=require('express');
const ImageController=require('../Controller/ImageController')
const verifyToken=require('../middleware/verifyToken')
const route=require('express').Router()


route.post(`/BlogImage/upload`,verifyToken,ImageController.UploadImage);
route.delete(`/DeleteImage`,verifyToken,ImageController.DeleteImage)

module.exports=route