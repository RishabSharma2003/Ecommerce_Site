//pakages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import colors from 'colors'


//utils
import connectDB from './db/db.js'


dotenv.config()
const PORT=process.env.PORT||5000

connectDB()
const app=express()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(morgan('dev'))


app.listen(PORT,()=>{
    console.log(`running on port ${PORT}`.bgCyan.white)
})

