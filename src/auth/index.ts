import { compare } from "bcrypt";
import UserModel from "../models/user.model";
import { compoarePassword } from "../utils/encript.password";
import { succesfulResponse, unSuccesfulResponse } from "../utils/response";
import { genToken } from "../utils/token";
import { Request, Response } from "express";

interface LoggedUser {
    id: number;
    name: string;
    username: string;
    lastname: string;
    email: string;
    birth?: string; // Date of birth (optional)
    gender?: 'Male' | 'Female' | 'Other'; // Gender (optional)
    puser_type_id?: number; // User type ID (optional)
    is_connected?: boolean;
    is_google?: boolean;
    is_disabled?: boolean;
    is_deleted?: boolean;
    created_at?: string; // Timestamp (optional)
    updated_at?: string; // Timestamp (optional)
  }



const auth = {
    signIn: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        
        try {
            const user = await UserModel.query().findOne({email});

            
            if (user) {
                if (compoarePassword(password, user.password)) {
                        const token = genToken({uid:user.id});
                        delete user.password;
                    return succesfulResponse(res, {user: <LoggedUser> user, token});
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