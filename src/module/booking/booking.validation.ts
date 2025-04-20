import { z } from 'zod';

export const bookingValidationSchema = z.object({
  tenant: z.string({ required_error: 'tenant ID is required' }),
  landlord: z.string({ required_error: 'landlord ID is required' }),
  listing: z.string({ required_error: 'Listing ID is required' }),
  bookingStatus: z.enum(["accepted" , "rejected" , "cancelled", "pending"]).default('pending'),
  paymentStatus: z.boolean({ required_error: 'Payment status is required' }),
});

export const bookingValidation = {bookingValidationSchema}