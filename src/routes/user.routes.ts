import { Router } from "express";
import userController from "../controllers/user.controller";
import { check } from "express-validator";
import { expressValidatorErrors } from "../middlewares/globals";

const userRoutes = Router();

//getting a list of users
userRoutes.get("/all", userController.findAll);

// Creating a new user
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
