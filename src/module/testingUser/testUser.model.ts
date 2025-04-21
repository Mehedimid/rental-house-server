// import { Schema, model } from 'mongoose';
// import { IUser } from './testUser.interface';


// const userSchema = new Schema<IUser>(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//     },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//       lowercase: true,
//       trim: true,
//     },
//     phone: {
//       type: String,
//       required: [true, 'Phone number is required'],
//     },
//     password: {
//       type: String,
//       required: [true, 'Password is required'],
//     },
//     role: {
//       type: String,
//       enum: ['admin', 'landlord', 'tenant'],
//       required: true,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export const User = model<IUser>('User', userSchema);
