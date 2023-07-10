const mongoose=require('mongoose');
const assert=require('assert')
require('dotenv').config()

const connectDb=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
        console.log(`mongodb connected successfully`)

    } catch (err) {
         assert.deepStrictEqual(err,null)
    }
    
}

module.exports=connectDb