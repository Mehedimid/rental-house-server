import config from '../../config';
import { TCreateUser } from '../User/user.interface';
import { createUserModel } from '../User/user.model';
import { TJwtPayload, TLoginUser } from './auth.interface';
import { generateToken } from './auth.utils';

const createUserIntoDB = async (userData: TCreateUser) => {
  const res = await createUserModel.create(userData);
  return res;
};

const loginService = async (payload: TLoginUser) => {
  const user = await createUserModel
    .findOne({ email: payload?.email })
    .select('+password');

  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await createUserModel.isPasswordMatched(
    payload.password,
    user.password
  );

  if (!isPasswordValid) {
    throw new Error('Incorrect password');
  }

  const jwtPayload: TJwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = generateToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  const refreshToken = generateToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    userInfo: {
      name: user.name,
      email: user.email,
      number: user.number,
      role: user.role,
      imageUrl: user.imageUrl,
    },
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginService,
};
