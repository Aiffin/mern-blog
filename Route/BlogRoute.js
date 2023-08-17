const express = require('express');
const BlogController=require('../Controller/BlogController')
const verifyToken=require('../middleware/verifyToken')
const auth=require("../middleware/auth")
const route = express.Router();

//tour route
route.get(`/blogs`,BlogController.getAll)
route.get(`/blog/:id`,BlogController.getById)
route.post(`/createBlog`,verifyToken,BlogController.createBlog)
route.put(`/update/:id`,verifyToken,BlogController.updateBlog)
route.delete(`/delete/:id`,verifyToken,BlogController.deleteBlog)
route.put(`/likeBlog/:id`,verifyToken,BlogController.CountlikeBlog)

module.exports=route