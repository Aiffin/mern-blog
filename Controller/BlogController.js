const Blog = require('../Model/Blog');
const Blog = require('../Model/Blog')

const BlogController={
    getAll:async(req,res)=>{
        try {
            const AllBlog=await Blog.find({}).populate("userId","-password")
            return res.status(200).json(AllBlog);
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getById:async(req,res)=>{
        try {
            const id=req.params.id
            const blog=await Blog.findById(id).populate("userId","-password")
            blog.views += 1;
            await blog.save()
            return res.status(200).json(blog)
        } catch (error) {
            return res.status(500).json(error)

        }
    },
    createBlog:async(req,res)=>{
        try {
            const blog= await Blog.create({...req.body,userId:req.user.id})
            return res.status(200).json(blog)

        } catch (error) {
            return res.status(500).json(error)

        }
    },
    updateBlog:async(req,res)=>{
        try {
            const blog=await Blog.findById(req.params.id)
            if(blog.userId !==req.user.id){
                throw new Error("You can update only your own posts")
            }
            const UpdateBlog=await Blog.findByIdAndUpdate(req.params.id,{$set:req.body},new:true)
        } catch (error) {
            
        }
    },
    deleteBlog:{}
}

module.exports=TourController