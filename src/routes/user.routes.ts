import { Router } from "express";
import userController from "../controllers/user.controller";

const userRoutes = Router();

userRoutes.get('/all', userController.findAll);
userRoutes.post('/', userController.createUser);

export default userRoutes;