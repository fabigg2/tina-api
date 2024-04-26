import { Router } from "express";
import userController from "../middlewares/user.controller";

const userRoutes = Router();

userRoutes.get('/all', userController.findAll);

export default userRoutes;