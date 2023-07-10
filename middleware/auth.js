const jwt=require("jsonwebtoken");

const auth=async(req,res,next)=>{
    try {
        const token = req.header('Authorization');

        jwt.verify(token,process.env.TOKEN_SECRET,(err,user)=>{
            if(err){
                console.log(err)
            }
            req.user=user;
            next()
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports=auth