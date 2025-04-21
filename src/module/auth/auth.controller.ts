import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import { AuthServices } from "./auth.service";
import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import config from "../../config";

const createUser = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthServices.createUserIntoDB(req.body);
    sendResponse(res, {
      success: true,
      message: 'User created successfully',
      data: result,
      statusCode: StatusCodes.ACCEPTED,
    });
  });


  const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthServices.loginService(req.body);
    const { accessToken, refreshToken } = result;
    res.cookie('refreshToken', refreshToken, {
      secure: config.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 365,
    });
    sendResponse(res, {
      success: true,
      message: 'User logged in successfully 😍',
      data: {
        accessToken,
        user:result?.userInfo
      },
      statusCode: StatusCodes.OK,
    });
  });

  export const AuthController = {
    createUser,
    login
  };
  