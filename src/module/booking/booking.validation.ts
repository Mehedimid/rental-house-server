import { z } from 'zod';
export const detailsValidationSchema = z.object({
  familyMembers: z.string({ required_error: 'family member is required' }),
  children: z.string({ required_error: 'children is required' }),
  message: z.string().optional(),
});

export const bookingValidationSchema = z.object({
  tenant: z.string({ required_error: 'tenant ID is required' }),
  landlord: z.string({ required_error: 'landlord ID is required' }),
  listing: z.string({ required_error: 'Listing ID is required' }),
  bookingStatus: z.enum(["accepted", "rejected", "cancelled", "pending"]).default('pending'),
  paymentStatus: z.boolean({ required_error: 'Payment status is required' }),
  details: detailsValidationSchema
});

export const bookingValidation = { bookingValidationSchema };
