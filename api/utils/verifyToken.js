import jwt from 'jsonwebtoken'
import { errorHandler } from './error.js'

export const verifyToken =  (req,res,next)=>{
    const token = req.cookies.boomtoken
    if(!token){
        return next(errorHandler(401, 'Unauthorised user'))
    }
    jwt.verify(token, process.env.JWT_SECRETKEY, (err, user)=>{
        if(err){
            return next(errorHandler(401, 'Unauthorised user'))
        }
        req.user = user
        next()
    })
}