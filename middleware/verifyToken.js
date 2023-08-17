const jwt =require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    // const token=req.headers.authorization.split(" ")[1];
    const token = req.header('Authorization');

    //console.log(token)
    jwt.verify(token,process.env.TOKEN_SECRET,(err,data)=>{
        if(err)
            return res.status(403).json({msg:"invalid or expired Token"})
        else{
            req.user=data //an obj with user id as its only 
            next()
        }
    })
}

module.exports=verifyToken