import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'
import * as path from 'path'
import CustomError from "../../helpers/error/CustomError";


type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.diskStorage({
    destination: (request: Request,file: Express.Multer.File,callback: DestinationCallback
    ): void => {
        callback(null,"./public/uploads");
    },

    filename: (request: Request, file: Express.Multer.File, callback: FileNameCallback
    ): void => {
        const extension = file.mimetype.split("/")[1];
        callback(null,"image_" + Date.now() + "_" + request.user.id + "." + extension);
    }
})

const fileFilter = ( request: Request, file: Express.Multer.File, callback: FileFilterCallback
): void => {
    const allowedTypes = ["image/jpg","image/gif","image/jpeg","image/png"];

    if (!allowedTypes.includes(file.mimetype)){
        let error:any = new CustomError("Please provide a valid image file",400);
        return callback(error,false);
    }
    return callback(null,true);
}

export const photoUpload = multer({storage,fileFilter});
