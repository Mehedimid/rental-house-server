/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { TCreateUser } from "../user/user.interface";

export interface TLogin extends Model<TCreateUser> {
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string,
    ): Promise<boolean>;
    isUserExistsByCustomId(email: string): Promise<TCreateUser>;
  }

  export type TLoginUser = {
    email: string;
    password: string;
  };
  export interface TJwtPayload {
    id: string;
    email:string;
    role:"admin" | "tenant" | "landlord";
  }