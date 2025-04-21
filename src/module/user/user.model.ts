import { Schema, model, Model } from 'mongoose';
import { TCreateUser, UserModelStatics } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

type UserModelType = Model<TCreateUser> & UserModelStatics;

const createUserSchema = new Schema<TCreateUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
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

// Hash password
createUserSchema.pre('save', async function (next) {
  const user = this as TCreateUser;
  user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds));
  next();
});

// Add static methods
createUserSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

createUserSchema.statics.isUserExistsByCustomId = async function (
  email: string
): Promise<TCreateUser | null> {
  return await this.findOne({ email });
};

// Final model with statics correctly typed!
export const createUserModel = model<TCreateUser, UserModelType>('User', createUserSchema);
