import jwt from 'jsonwebtoken'
import userModel from '../models/userModel.js'
import dotenv from 'dotenv'
dotenv.config()

export const authenticate=async(req,res,next)=>{
    let token=req?.cookies?.jwt
    console.log("token ".yellow+token)

    if(!token){
        const error = Object.assign(new Error('Token not found authentication failed'),{statusCode: 400 });
        return next(error);
    }

    const decoded=jwt.decode(token,process.env.JWT_SECRET)
    console.log(`${JSON.stringify(decoded)}`.italic.brightBlue)
    req.user=await userModel.findById({_id:decoded.userId}).select('-password')
    console.log(`${JSON.stringify(req.user)}`.bold.brightBlue)
    next()
}

export const isAdmin=async(req,res,next)=>{
    if(!req.user||!req.user.isAdmin){
        const error = Object.assign(new Error('Not authorized as admin'),{statusCode: 400});
        return next(error);
    }
    next()

}