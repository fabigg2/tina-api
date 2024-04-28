import { validationResult, body } from "express-validator";
import { unSuccesfulResponse } from "../utils/response";
import { verifyToken } from "../utils/token";
import { uploadImage, deleteImage } from "../utils/image";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";

/**
 * Catch errors generates by express-validator methods
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const expressValidatorErrors = (req:Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (errors.isEmpty())
        return next()
    return unSuccesfulResponse(res, errors);
}


const verfyUserToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-token']?.toString() || 'a';
    try {
        const { _id } = <any> verifyToken(token);

        req.params._id = _id;
    } catch (err) {
        return unSuccesfulResponse(res, { err: 'token invalido' }, 403);
    }
    next();
}


/**
 * Catch errors in th.body.errors variable
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const catchErrors = (req: Request, res: Response, next: NextFunction) => {
    const { errors } = req.body;
    if (errors && errors.length > 0)
        return unSuccesfulResponse(res, errors, 400);
    next();
}

const loadImage = async(req: Request, res:Response, next:NextFunction) => {
    
    // console.log(req.files)
    const img  = <UploadedFile> req.files?.img;
    if (img) {
        const tempPath = img.tempFilePath;
        try {
            req.body.img= await uploadImage(tempPath);
        } catch (error) {
            unSuccesfulResponse(res);
        }
    }
    next();

}




export {
    expressValidatorErrors,
    catchErrors,
    verfyUserToken,
    loadImage
}