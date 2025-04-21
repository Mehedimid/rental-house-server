import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required.' }).email(),
  password: z.string({ required_error: 'Password is required' }),

});

const RegisterValidationSchema = z.object({
  name: z.string({ required_error: 'Name is required.' }),
  email: z
    .string({ required_error: 'Email is required.' })
    .email('Invalid email format'),
  phone: z.string({ required_error: 'Phone Number is required'}),
  password: z.string({ required_error: 'Password is required.' }),
  imageUrl: z.string({ required_error: 'Image URL is required.' }).url('Invalid image URL'),
  role: z.enum(['admin', 'tenant', 'landlord']).default('tenant'),
  isBlocked: z.boolean().default(false),
});


export const AuthValidation = {
  loginValidationSchema,
  RegisterValidationSchema
};