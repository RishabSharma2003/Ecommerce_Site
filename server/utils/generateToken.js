import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const generateToken=(res,userId)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'20d'})
    res.cookie('jwt',token,{
        maxAge:20*24*60*60*1000
    })
    return token;
}

export default generateToken