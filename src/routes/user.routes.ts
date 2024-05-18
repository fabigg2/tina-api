import { Router } from "express";
import userController from "../controllers/user.controller";
import { check } from "express-validator";
import { expressValidatorErrors } from "../middlewares/globals";
import { emailExist } from "../middlewares/user.middleware";

const userRoutes = Router();

/**
 * @openapi
 * tags:
 *  - name: user
 *    description: Everything about users
 */

/**
 * @openapi
 * /user/all:
 *   get:
 *     summary: users list
 *     tags:
 *      - user
 *     responses:
 *       200:
 *         description: User created successfuly.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: server error 
 */


userRoutes.get("/all", userController.findAll);



/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create new user
 *     tags:
 *      - user
 *     requestBody: 
 *      required: true
 *      content:
 *       application/json:
 *         schema:
 *            $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created successfuly.
 *       500:
 *         description: server error 
 */
userRoutes.post(
  "/",
  [
    check("name", "name is required").notEmpty(),
    check("lastname", "lastname is required").notEmpty(),
    check("email", "email is invalid").isEmail().isEmail(),
    check("password", "password is invalid").notEmpty(),
    emailExist,
    expressValidatorErrors,
  ],
  userController.createUser
);

export default userRoutes;
