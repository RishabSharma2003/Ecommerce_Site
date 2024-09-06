import userModel from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import colors from 'colors'
import generateToken from '../utils/generateToken.js';


//signup
export const signupController=async (req, res, next) => {
    const {username,email,password} = req.body;
    // console.log(req.body)
    if (!username||!email||!password) {
        //Yes, using Object.assign() allows you to create an Error object with additional custom properties.
        const error = Object.assign(new Error('Please enter all the fields'),{statusCode: 400 });
        return next(error);//passed error to global middleware
    }

    const salt=await bcrypt.genSalt(5)
    const hashedPassword=await bcrypt.hash(password,salt)
    const userExist=await userModel.findOne({email})
    if(userExist){
        const error = Object.assign(new Error('User already exists'),{statusCode: 400 });
        return next(error);
    }

    const newUser=await new userModel({username,email,password:hashedPassword}).save()
    generateToken(res,newUser._id)
    const data={
        _id:newUser._id,
        username:newUser.username,
        email:newUser.email,
        isAdmin:newUser.isAdmin,
    }
    console.log(`${username} user created successfully`.bold.brightBlue)
    res.status(200).json({ isSuccess: true,data});
}





//login
export const loginController=async(req, res, next)=>{
    const {email,password} = req.body;
    // console.log(req.body)
    if (!email||!password) {
        const error = Object.assign(new Error('Please enter all the fields'),{statusCode: 400 });
        return next(error);
    }

    const existingUser=await userModel.findOne({email})
    if(!existingUser){
        const error = Object.assign(new Error('User not exist'),{statusCode: 400 });
        return next(error);
    }

    const isPasswordValid=await bcrypt.compare(password,existingUser.password)
    if(!isPasswordValid){
        const error = Object.assign(new Error('Email or Password incorrect'),{statusCode: 400 });
        return next(error);
    }

    generateToken(res,existingUser._id)
    const data={
        _id:existingUser._id,
        username:existingUser.username,
        email:existingUser.email,
        isAdmin:existingUser.isAdmin,
    }
    console.log(`${existingUser.username} user login successfully`.bold.brightBlue)
    res.status(200).json({ isSuccess: true,data});
}




//logout
export const logoutController=async(req,res,next)=>{
    res.cookie('jwt','',{
        expires:new Date(0)
    })

    res.status(200).json({ isSuccess: true,message:'Logout Successfully'});
}



//all users
export const getAllUsers=async(req,res,next)=>{
    const users=await userModel.find({})
    res.status(200).json({ isSuccess: true,users});
}



//get single user
export const getCurrectUserProfile=async(req,res,next)=>{
    if(!req?.user){
        const error = Object.assign(new Error('User not found in req.user'),{statusCode: 400});
        return next(error);
    }
    const user=await userModel.findById(req.user._id)
    if(!user){
        const error = Object.assign(new Error('User not found'),{statusCode: 400});
        return next(error);
    }
    console.log(JSON.stringify(user).bold.brightBlue)

    const data={
        _id:user._id,
        username:user.username,
        email:user.email,
    }
    res.status(200).json({ isSuccess: true,data});
}




//update user profile
export const updateCurrentUserProfile=async(req,res,next)=>{
    if(!req?.user){
        const error = Object.assign(new Error('User not found in req.user'),{statusCode: 400});
        return next(error);
    }
    const user=await userModel.findById(req.user._id)
    if(!user){
        const error = Object.assign(new Error('User not found'),{statusCode: 400});
        return next(error);
    }
    console.log(JSON.stringify(user).bold.brightBlue)

    user.username=req.body.username||user.username;
    user.email=req.body.email||user.email

    if(req.body.password){
        const salt=await bcrypt.genSalt(5)
        const hashedPassword=await bcrypt.hash(req.body.password,salt);
        user.password=hashedPassword
    }
    const updatedUser=await user.save()

    const data={
        _id:updatedUser._id,
        username:updatedUser.username,
        email:updatedUser.email,
        // password:updatedUser.password,
        isAdmin:updatedUser.isAdmin,
    }
    res.status(200).json({ isSuccess: true,data});
}




//delete user 
export const deleteUserById=async(req,res,next)=>{
    const user=await userModel.findById(req.params.id)
    if(!user){
        const error = Object.assign(new Error('User not Exist'),{statusCode: 400});
        return next(error);
    }

    if(user.isAdmin){
        const error = Object.assign(new Error('Cannot Delete admin user'),{statusCode: 400});
        return next(error);
    }
    await userModel.deleteOne({_id:user._id})

    res.status(200).json({ isSuccess: true,message:`User ${user.username} deleted Successfully`});
}




//get user by id
export const getUserById=async(req,res,next)=>{
    const user=await userModel.findById(req.params.id).select('-password')
    if(!user){
        const error = Object.assign(new Error('User not Exist'),{statusCode: 400});
        return next(error);
    }

    res.status(200).json({ isSuccess: true,user});
}





//update user by id
export const updateUserById=async(req,res,next)=>{
    const user=await userModel.findById(req.params.id).select('-password')
    if(!user){
        const error = Object.assign(new Error('User not Exist'),{statusCode: 400});
        return next(error);
    }

    user.username=req.body.username||user.username
    user.email=req.body.email||user.email

    user.isAdmin=req.body.isAdmin||user.isAdmin
    const updatedUser=await user.save()
    const data={
        _id:updatedUser._id,
        username:updatedUser.username,
        email:updatedUser.email,
        isAdmin:updatedUser.isAdmin
    }

    res.status(200).json({ isSuccess: true,data});
}