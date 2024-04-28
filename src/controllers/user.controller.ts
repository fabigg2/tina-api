import userModel from "../models/user.model";
import { Request, Response } from "express";

const userController = {
  // get all users records
  async findAll(req: Request, res: Response) {
    const users = await userModel.find({isDeleted:false});
    res.json({
      data: users,
      msg: "Successfull",
      records: users.length
    });
  },

  //create a new user
  async createUser(req: Request, res: Response) {
    const { body } = req;
    const newUser = new userModel(body);
    try {
      const user = await newUser.save();
      if (user)
        res.json({
          data: user,
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'internal server error'
      })
    }
  },
};

export default userController;
