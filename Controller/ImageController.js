const cloudinary = require('cloudinary').v2
const fs =require('fs')
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET
});

const removeTemp=(path)=>{
    fs.unlinkSync(path)
}

const ImageController={
    UploadImage:async(req,res)=>{
        try {
            const file=req.files.photo

            if(file.size>1*1024*1024){
                removeTemp(file.tempFilePath)
                return res.status(404).json({msg:'file should be less then 1 mb'})
            }

             //validate image type
             if(file.mimetype!== 'image/png' && file.mimetype !== 'image/jpeg'){
                removeTemp(file.tempFilePath)
                return res.status(StatusCodes.BAD_REQUEST).json({msg:`File size must be less tahn`})
            }

            //upload
            await cloudinary.uploader.upload(file.tempFilePath,{folder:'img_upload'},(err,result)=>{
                if(err)
                res.status(404).json({msg:err.message})

                    removeTemp(file.tempFilePath)
                    return res.status(200).json({
                        public_id:result.public_id,
                        url:result.secure_url
                    })
                
            })

            //res.json({file})
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    DeleteImage:async(req,res)=>{
        try {
            const {public_id}=req.body 
            if(!public_id){
                return res.status(404).json({msg:"public id not found"})
            }

            await cloudinary.uploader.destroy(public_id,(err,result)=>{
                if(err)
                        res.status(404).json({msg:err.message})
                return res.status(200).json({msg:"image deleted successfully"

                })
            })
        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}

module.exports= ImageController

// try {
//     //console.log(req.body)
//     const file=req.files.photo;
//     //const file=req.files.photo

//     if(file.size>1*1024*1024){
//         removeTemp(file.tempFilePath)
//         return res.status(404).json({msg:'file should be less then 1 mb'})
//     }

//      //validate image type
//      if(file.mimetype!== 'image/png' && file.mimetype !== 'image/jpeg'){
//         removeTemp(file.tempFilePath)
//         return res.status(StatusCodes.BAD_REQUEST).json({msg:`File size must be less tahn`})
//     }
//     cloudinary.uploader.upload(file.tempFilePath,{folder:'img_upload'},(err,result)=>{
//         console.log(result)
//         const blog=new Blog({
//             title:req.body.title,
//             description:req.body.description,
//             category:req.body.category,
//             photo:result.url,
//             userId:req.user._id});
//         blog.save()
//         return res.status(200).json(blog)

//     })

// } catch (error) {
//     return res.status(500).json(error)

// }