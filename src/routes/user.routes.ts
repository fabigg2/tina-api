import { Router } from "express";
import userController from "../controllers/user.controller";
import { check } from "express-validator";
import { expressValidatorErrors } from "../middlewares/globals";

const userRoutes = Router();

/**
 * @openapi
 * tags:
 *  - name: user
 *    description: Everything about users
 */

//getting a list of users
userRoutes.get("/all", userController.findAll);

/**
 * @openapi
 * /user:
 *   post:
 *     summary: Create user
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
    expressValidatorErrors,
  ],
  userController.createUser
);

export default userRoutes;
