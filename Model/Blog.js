const mongoose=require("mongoose");
const User = require("./User");

const BlogSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Types.ObjectId,
        ref:User,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    photo: {
        type:String
    
    },
    category:{
        type:String,
        required:true
    },
    features:{
        type:Boolean,
        default:false
    },
    views:{
        type:Number,
        default:0
    },
    likes:{
        type:[String],
        default:[]
    }}
    ,{timestamps:true}
)

module.exports=mongoose.model("Blog",BlogSchema)