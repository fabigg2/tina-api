import { compare } from "bcrypt";
import userModel from "../models/user.model";
import { compoarePassword } from "../utils/encript.password";
import { succesfulResponse, unSuccesfulResponse } from "../utils/response";
import { genToken } from "../utils/token";
import { Request, Response } from "express";

const auth = {
    signIn: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        
        try {
            const user = await userModel.findOne({email});

            
            if (user) {
                if (compoarePassword(password, user.password)) {
                        const token = genToken({uid:user._id});
                    return succesfulResponse(res, {user, token});
                }
            }
            unSuccesfulResponse(res, {err: 'user or password incorrect'},400)

        } catch (error) {
            console.log(error);
            unSuccesfulResponse(res);

        }

    }
};


export { auth }