import mongoose from "mongoose";
import dotenv from "dotenv"
import colors from 'colors'

dotenv.config()

const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connected to Database successfully".green)
    } catch (error) {
        console.log(`Error in Database ${error}`.red)
        process.exit(1)
    }
}
export default connectDB