const Blog = require('../Model/Blog');
const cloudinary = require('cloudinary').v2

const { findById, findByIdAndDelete } = require('../Model/User');

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET
  });

//   const removeTemp=(path)=>{
//     fs.unlinkSync(path)
// }

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
            //console.log(id)
            const blog=await Blog.findById(id).populate("userId","-password")
            blog.views += 1;
            await blog.save()
            //console.log(blog)
            return res.status(200).json(blog)
        } catch (error) {
            return res.status(500).json(error)

        }
    },
    createBlog:async(req,res)=>{

       const {title,description,category,photo}=req.body
        try {
            //console.log(req.body)
            //const file=req.files.photo;
            //const file=req.files.photo

            // if(file.size>1*1024*1024){
            //     removeTemp(file.tempFilePath)
            //     return res.status(404).json({msg:'file should be less then 1 mb'})
            // }

            // validate image type
            //  if(file.mimetype!== 'image/png' && file.mimetype !== 'image/jpeg'){
            //     removeTemp(file.tempFilePath)
            //     return res.status(StatusCodes.BAD_REQUEST).json({msg:`File size must be less tahn`})
            // }
            const result=await cloudinary.uploader.upload(photo,{upload_preset:'react_cloudinary'})
                //console.log(result)
                const blog=await Blog.create({
                    title:title,
                    description:description,
                    category:category,
                    photo:result.secure_url,
                    userId:req.user._id});
    
                return res.status(200).json(blog)

            

        } catch (error) {
            return res.status(500).json(error)

        }
    },
    updateBlog:async(req,res)=>{
        try {
            const id=req.params.id;
           // console.log(id)
            const blog=await Blog.findById(id)
            //console.log(blog.userId,req.user._id)
            if(blog.userId.toString() !==req.user._id){
                throw new Error("You can update only your own posts")
            }
            const UpdateBlog=await Blog.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true}).populate('userId','-password')
            return res.status(200).json(UpdateBlog)
        } catch (error) {
            return res.status(500).json(error.message)

        }
    },
    CountlikeBlog:async(req,res)=>{
        try {
            const blog=await Blog.findById(req.params.id)
            //console.log(req.user._id)
            // console.log(req.params.id)
            if(blog.likes.includes(req.user._id)){
                blog.likes=blog.likes.filter((userId)=>userId !== req.user._id)
                await blog.save()
                return res.status(200).json({msg:"Successfully unliked te blog"})
            }else{
                blog.likes.push(req.user._id)
                await blog.save()
                //console.log(blog.likes)
                return res.status(200).json({msg:"successfully liked the blog"})
            }
        } catch (error) {
            return res.status(500).json(error.message)
 
        }
    },
    deleteBlog:async(req,res)=>{
        try{
            const blog=await Blog.findById(req.params.id);
            if(blog.userId.toString() !== req.user._id.toString()){
                throw new Error("you can delete your own blog")
            }
            await Blog.findByIdAndDelete(req.params.id)
    
            return res.status(200).json({msg:"Successfully deleted the Blog"})
        } catch(error){
            return res.status(500).json(error.message)

        }   

    }
}

module.exports=BlogController