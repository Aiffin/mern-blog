//config env file
require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const UserRoute=require('./Route/UserRoute')
const BlogRoute=require('./Route/BlogRoute')
const ImageRoute=require('./Route/ImageRoute')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const connectDb = require('./config')
const fileUpload=require('express-fileupload')
const app=express()
const PORT=5000 || process.env.PORT
const path=require('path')


app.use(cookieParser(process.env.TOKEN_SECRET))

//body parser
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended:true,limit: '50mb'}));

app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))

//default route
app.use('/api',UserRoute)
app.use(`/api`,BlogRoute)
app.use(`/api`,ImageRoute)

//static file

app.use(express.static(path.join(__dirname,'./frontend/build')))

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"))
})


app.get(`/`,(req,res)=>{
    res.send("hello")
})

const start=async(req,res)=>{
    try {
        await connectDb()
        app.listen(PORT,()=>{
        console.log(`https://localhost:${PORT}/`)
        })
    } catch (err) {
        //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg:err.message})
        console.log(err.message)

    }
}   

start()
