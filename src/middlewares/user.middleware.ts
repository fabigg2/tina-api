import { NextFunction, Request, Response } from "express";
import UserModel from "../models/user.model";
import { succesfulResponse, unSuccesfulResponse } from "../utils/response";

export async function emailExist(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  try {
    const userFound = await UserModel.query().findOne({ email });
    
    if (userFound)
      unSuccesfulResponse(res, {
        ok: false,
        msg: "Email aready exist",
      });
    else next();
  } catch (error) {
    unSuccesfulResponse(
      res,
      error,
      500,
      "server error, contact your system admin"
    );
  }

  
}
