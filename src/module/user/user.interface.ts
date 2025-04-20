import { Document } from 'mongoose';

export interface TCreateUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  isActive: boolean;
  imageUrl: string;
}

export interface TUpdateUserStatus {
  id: string;
  action: string;
}
