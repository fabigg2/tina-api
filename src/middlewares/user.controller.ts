import userModel from "../models/user.model"
import { Request, Response } from "express";

const userController = {
    async findAll(req:Request, res:Response){
       const users = await userModel.find()
       res.json({
        data: users,
        msg:'Successfull'
       })
    }
}

export default userController;