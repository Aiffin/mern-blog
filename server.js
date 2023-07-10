//config env file
require('dotenv').config()

const express=require('express')
const mongoose=require('mongoose')
const UserRoute=require('./Route/UserRoute')
const TourRoute=require('./Route/TourRoute')
const cookieParser=require('cookie-parser')
const cors=require('cors')
const connectDb = require('./config')
const app=express()
const PORT=5000 || process.env.PORT


app.use(cookieParser(process.env.TOKEN_SECRET))

//body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cors())
//default route
app.use('/api',UserRoute)
app.use(`/tour`,TourRoute)

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
