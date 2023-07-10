const User=require('../Model/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')
const {createaccessToken}=require('../util/Token')

const AuthController={
    signup:async(req,res)=>{

        try {
            const {name,email,password}=req.body;
            const encPassword=await bcrypt.hash(password,10)

            const existingUser=await User.findOne({email:email});
            if(existingUser){
                return res.status(400).json({msg:"user already existing"})
             }

            const user=await User.create({
                name,
                email,
                password:encPassword
            });

            res.status(201).json({msg:"User registered successfully",user})
    
        } catch (error) {
            return console.log(error)
        }
        
    },
    login:async(req,res)=>{

        try {
            const {email,password}=req.body;

            const extUser=await User.findOne({email});
            if(!extUser){
                return res.status(404).json({msg:"user is not existing"});
            }
            const isMatch=await bcrypt.compare(password,extUser.password)
            if(!isMatch){
                return res.status(404).json({msg:"password is not match"})
            }

            const accessToken = createaccessToken({_id:extUser._id})

            res.cookie('refreshToken',accessToken,{
                httpOnly:true,
                signed:true,
                path:`/api/refreshToken`,
                maxAge:1*24*60*60*1000
            })

            res.json({msg:"login successfully",accessToken,extUser})

        } catch (error) {
            console.log(error)
        }
    },
    logout:async(req,res)=>{
        try {
            res.clearCookie('refreshToken',{path:`/api/refreshToken`})
            res.status(200).json({msg:"user logout"})
        } catch (error) {
            console.log(error)
        }
    },
    refreshToken:async(req,res)=>{
        try {
            const rf=req.signedCookies.refreshToken;
            if(!rf){
                return res.status(400).json({msg:"session expired"})
            }
            // jwt.verify(rf,process.env.TOKEN_SECRET,)

            jwt.verify(rf,process.env.TOKEN_SECRET,(err,user)=>{
                if(err)
                   return res.status(400).json({msg:"not found"})
                
                const accessToken=createaccessToken({id:user._id})
                res.json({accessToken})
                
            })
            // res.json({rf})
        } catch (error) {
            console.log(error)
        }
    },
    resetPassword:async(req,res)=>{
        try {
            const id=req.user._id;
            const {oldPassword,newPassword}=req.body;

            const extUser=await User.findById({_id:id})
            if(!extUser){
                return res.status(404).json({msg:"user is not existing"})
            }

            const isMatch=await bcrypt.compareSync(oldPassword,extUser.password)

            if(!isMatch){
                return res.status(404).json({msg:"password is not match"})
            }

            const newPasswordHash=bcrypt.hashSync(newPassword);

            const output=await User.findByIdAndUpdate({_id:id},{password:newPasswordHash})

            res.status(200).json({msg:"new password updated"})

        } catch (error) {
            console.log(error)
        }
    }
}

module.exports=AuthController