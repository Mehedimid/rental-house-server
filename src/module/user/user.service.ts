/* eslint-disable @typescript-eslint/no-unused-vars */
import bcrypt from 'bcrypt';
import { StatusCodes } from 'http-status-codes';
import AppError from '../../ErrorHandlers/AppError';
import { User } from './user.model';
import { TUpdateUserStatus } from './user.interface';
import mongoose from 'mongoose';
import config from '../../config';

const getAllUserFromDB = async () => {
  const users = await User.find();
  return users;
};

const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });
  if (!result) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return result;
};

const updateUserStatusInDB = async (payload: TUpdateUserStatus) => {
  const user = await User.findById(payload?.id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User Not Found');
  }

  if (user.role === 'admin') {
    throw new AppError(StatusCodes.FORBIDDEN, 'Cannot change admin status');
  }

  if (typeof payload.isActive !== 'boolean') {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid isActive value');
  }

  const updatedUser = await User.findByIdAndUpdate(
    payload.id,
    { isActive: payload.isActive },
    { new: true }
  );

  return updatedUser;
};


const updateUserProfileInDB = async (payload: any) => {
  if (!payload?.email) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'User Not Found');
  }
  if (!payload?.name) {
    throw new AppError(StatusCodes.NO_CONTENT, 'No Name Provided');
  }

  try {
    const data = await User.updateOne(
      { email: payload?.email },
      { $set: { name: payload?.name } },
    );

    if (data.modifiedCount === 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'User profile update failed');
    }

    return { name: payload?.name };
  } catch (error) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Unable to update user profile');
  }
};


const updateUserPasswordInDB = async (payload: any) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  

  try {
    const user = await User
      .findOne({ email: payload?.email })
      .select("+password")
      .session(session);
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User Not found');
    }

    const isMatchPassword = await bcrypt.compare(
      payload?.cpassword,
      user?.password,
    );
    if (!isMatchPassword) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'Incorrect Old Password, Provide Correct Password',
      );
    }

    const newpass = await bcrypt.hash(
      payload?.npassword,
      Number(config.bcrypt_salt_rounds),
    );
    if (!newpass) {
      throw new AppError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        'Error while password hashing',
      );
    }

    const res = await User
      .updateOne({ email: payload?.email }, { password: newpass })
      .session(session);

    await session.commitTransaction();
    session.endSession();

    return res;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const changeUserRoleInDB = async (id: string, newRole: 'admin' | 'tenant' | 'landlord') => {
  const user = await User.findById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  if (!['admin', 'tenant', 'landlord'].includes(newRole)) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid role provided');
  }

  if (user.role === newRole) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User already has this role');
  }

  user.role = newRole;
  const updatedUser = await User.findByIdAndUpdate(
    id,
    { role: newRole },
    { new: true, runValidators: true }
  );
  return updatedUser;
};



export const UserServices = {
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserStatusInDB,
  updateUserProfileInDB,
  updateUserPasswordInDB,
  changeUserRoleInDB,
};

