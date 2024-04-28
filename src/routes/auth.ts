import {Router} from 'express';
import {check}from 'express-validator';
import {expressValidatorErrors}from '../middlewares/globals';
import {auth}from '../auth';

const authRoutes = Router();

authRoutes.post('/', 
[
    check('email', 'email is invalid').isEmail(),
    check('password', 'password is invalid').notEmpty(),
    expressValidatorErrors,
], 
auth.signIn);


export {authRoutes}