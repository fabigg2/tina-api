import UserModel from "../models/user.model";
import { Request, Response } from "express";
import { succesfulResponse, unSuccesfulResponse } from "../utils/response";

const userController = {
  // get all users records
  async findAll(req: Request, res: Response) {
    try {
      const users = await UserModel.query();
      succesfulResponse(res, {
        data: users,
        records: users.length,
      });
    } catch (error) {
      unSuccesfulResponse(res, error);
    }
  },

  //create a new user
  async createUser(req: Request, res: Response) {
    const { body } = req;
    try {
      const user = await UserModel.query().insert(body);
      if (user)
        succesfulResponse(
          res,
          {
            data: user,
          },
          201
        );
    } catch (error) {
      unSuccesfulResponse(res, {
        error: "internal server error",
      });
    }
  },
};

export default userController;
