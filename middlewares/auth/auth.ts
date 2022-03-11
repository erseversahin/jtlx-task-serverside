import { Request,Response,NextFunction } from "express"
import CustomError from "../../helpers/error/CustomError"
import { verify } from 'jsonwebtoken'

declare module 'express-serve-static-core' {
    interface Request {
        user:{
            id: String,
            username: String
        }
    }
}

export const getAccessToRoute = (req:Request,res:Response,next:NextFunction) => {
    
    if(!isTokenIcluded(req)){
        return next(new CustomError("You are not authorize to access this route.",401))
    }
    

    const {JWT_SECRET_KEY} = process.env;
    const accessToken:any = getAccessToken(req);

    // @ts-ignore
    verify(accessToken,JWT_SECRET_KEY,(err:any,decoded:any) => {
       
        if(err){
            console.log(err);
            return next(new CustomError("You are not authorize to access this route.",401));
        }
       
      
        req.user = {
            id : decoded.id,
            username: decoded.username
        }

    })

    next();
}

const isTokenIcluded = (req:Request) => {
    return req.headers.authorization && req.headers.authorization.startsWith('Bearer')
}

const getAccessToken = (req:Request) => {
    return req.headers.authorization?.split(" ")[1];
}