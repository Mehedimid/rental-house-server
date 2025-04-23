import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { createUserModel } from '../module/user/user.model';
import AppError from '../ErrorHandlers/AppError';
import catchAsync from '../utils/catchAsync';

const verifyUserOrAdmin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization;
    const token = bearerToken?.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'Unauthorized!');
    }

    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
    } catch (err) {
      console.log(err)
      throw new AppError(401, 'Invalid token');
    }

    const { role, email } = decoded;

    const user = await createUserModel.isUserExistsByCustomId(email);
    if (!user) {
      throw new AppError(404, 'User not found!');
    }

    const isBlocked = user?.isBlocked;
    if (isBlocked) {
      throw new AppError(403, 'User is blocked!');
    }

    if (role !== 'admin' && email !== req.params.email) {  
      throw new AppError(403, 'You are not authorized to access this data!');
    }

    (req as any).user = decoded;  
    next();
  }
);

export default verifyUserOrAdmin;
