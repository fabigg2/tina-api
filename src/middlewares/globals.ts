import { validationResult, body } from "express-validator";
const { unSuccesfulResponse } = require("../utils/response");
const { verifyToken } = require('../utils/token');
const {uploadImage, deleteImage} = require('../utils/image');

/**
 * Catch errors generates by express-validator methods
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const expressValidatorErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty())
        return next()
    return unSuccesfulResponse(res, errors);
}


const verfyUserToken = (req, res, next) => {
    const token = req.headers['x-token']?.toString() || 'a';
    try {
        const { _id } = verifyToken(token);

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
const catchErrors = (req, res, next) => {
    const { errors } = req.body;
    if (errors && errors.length > 0)
        return unSuccesfulResponse(res, errors, 400);
    next();
}

const loadImage = async(req, res, next) => {
    
    // console.log(req.files)
    const img = req.files?.img;
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




module.exports = {
    expressValidatorErrors,
    catchErrors,
    verfyUserToken,
    loadImage
}