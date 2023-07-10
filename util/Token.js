const jwt = require("jsonwebtoken")

const createaccessToken=(user)=>{
    return jwt.sign(user,process.env.TOKEN_SECRET,{expiresIn:'1d'});
}

module.exports={createaccessToken}