import { Request,Response,NextFunction } from "express"
import CustomError from "../../helpers/error/CustomError";
export const customErrorHandler = (err:any,req:Request,res:Response,next:NextFunction)=>{

    let customError:any = err;

    if(err.name === "SyntaxError"){

    }
    if(err.name === "ValidationError"){
        customError = new CustomError(err.message, 400)
    }
    if(err.name === "CastError"){
        customError = new CustomError('Please provide a valid field', 400)
    }

    if(err.name === "MongoServerError" && err.code === 11000){

        if(err.keyValue && err.keyValue.email) {
            customError = new CustomError(`E-mail has already been registered. This field must be unique.`, 400)
        }else if(err.keyValue && err.keyValue.username) {
            customError = new CustomError(`Provided username has already been registered. This field must be unique.`, 400)
        }
        else {
            customError = new CustomError(`Field has already been registered. This field must be unique.`, 400)
        }
    }

    console.info('ERROR DETAIL',err);

    const message = customError.message || "Something went wrong!";
    const status = customError.status || 500;

    res.status(status).json({
        success:false,
        message
    })

}
