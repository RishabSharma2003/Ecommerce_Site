//pakages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import colors from 'colors'


//utils
import connectDB from './db/db.js'
import userRoutes from './routes/userRoutes.js'
import asyncErrorHandler from './error/asyncErrorHandler.js'


dotenv.config()
const PORT=process.env.PORT||8000

connectDB()
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))

// app.get('/',(req,res)=>{
//     res.send("hello")
// })
app.use('/api/users',userRoutes)

// Global error handling middleware
app.use(asyncErrorHandler);

app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`.yellow.bgBrightGreen)
})

