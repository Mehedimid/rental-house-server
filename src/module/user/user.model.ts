// src/module/User/user.model.ts
import mongoose, { Schema, model, Model } from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../config';
import { TCreateUser, UserModelStatics } from './user.interface';

type UserModelType = Model<TCreateUser> & UserModelStatics;

const createUserSchema = new Schema<TCreateUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['admin', 'tenant', 'landlord'], required: true },
  isBlocked: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  imageUrl: { type: String, required: true },
}, {
  timestamps: true,
  versionKey: false,
  collection: 'users',
});

createUserSchema.pre('save', async function (next) {
  const user = this as TCreateUser;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

createUserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(plainTextPassword, hashedPassword);
};

createUserSchema.statics.isUserExistsByCustomId = async function (
  email: string
): Promise<TCreateUser | null> {
  return this.findOne({ email });
};

console.log('User model loaded!');

// ✅ THIS LINE is critical: use the already compiled model if it exists
export const User = (mongoose.models.User as UserModelType) || model<TCreateUser, UserModelType>('User', createUserSchema);
