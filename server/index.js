//pakages
import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'


//utils
import connectDB from './db/db.js'


dotenv.config()
const port=process.env.PORT

connectDB()
const app=express()

app.use(express.json())
