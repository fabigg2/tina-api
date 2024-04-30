import {Router} from 'express';
import {check}from 'express-validator';
import {expressValidatorErrors}from '../middlewares/globals';
import {auth}from '../auth';

const authRoutes = Router();

/**
 * @openapi
 * tags:
 *  - name: auth
 *    description: Everything about authentication
 *    
 */


/**
 * @openapi
 * /auth/sign-in:
 *   post:
 *     summary: Log in with email and password
 *     tags: 
 *      - auth
 *     requestBody: 
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                 type: object
 *                 properties:
 *                     email:
 *                         type: string
 *                     password:
 *                         type: string  
 *     responses:
 *       200:
 *         description: .
 *         content:
 *          application/json:
 *            schema:
 *                 type: object
 *                 properties:
 *                     ok:
 *                         type: boolean
 *                     msg:
 *                         type: string
 *                     data:
 *                         type: object              
 *       500:
 *         description: server error 
 */

authRoutes.post('/sign-in', 
[
    check('email', 'email is invalid').isEmail(),
    check('password', 'password is invalid').notEmpty(),
    expressValidatorErrors,
], 
auth.signIn);


export {authRoutes}