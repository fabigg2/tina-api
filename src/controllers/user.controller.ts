import UserModel from "../models/user.model";
import { Request, Response } from "express";

const userController = {
  // get all users records
  async findAll(req: Request, res: Response) {
    const users = await UserModel.query();
    res.json({
      data: users,
      msg: "Successfull",
      records: users.length
    });
  },

  //create a new user
  async createUser(req: Request, res: Response) {
    const { body } = req;
    try {
      const user = (await UserModel.query().insert(body));
      if (user)
        res.status(201).json({
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
