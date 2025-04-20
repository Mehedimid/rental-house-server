import { z } from 'zod';

// Schema for listing images
const listingImagesSchema = z.object({
  img1: z.string().url(),
  img2: z.string().url(),
  img3: z.string().url(),
  img4: z.string().url(),
  img5: z.string().url(),
});

// Schema for listing details (like description, rooms, etc.)
const listingDetailsSchema = z.object({
  description: z.string({ required_error: 'Description is required' }),
  rooms: z
    .number({
      required_error: 'Number of rooms is required',
    })
    .positive('Number of rooms must be a positive number'),
  garage: z.string({ required_error: 'Garage info is required' }),
  yearBuilt: z.coerce.date({
    required_error: 'Year built is required',
  }),
});

// Enum for listing types
const listingTypeEnum = z.enum(['apartment', 'house', 'villa', 'townhouse'], {
  required_error: 'Type is required',
});

// Enum for listing status
const statusTypeEnum = z.enum(['available', 'not available'], {
  required_error: 'Status is required',
});

// Schema for creating a listing
export const createListingValidationSchema = z.object({
  landlord: z.string({ required_error: 'Landlord ID is required' }),
  images: listingImagesSchema.optional(),
  flatPlan: z.string().url().optional(),
  title: z
    .string({ required_error: 'Title is required' })
    .min(3, 'Title must be at least 3 characters long'),
  address: z
    .string({ required_error: 'Address is required' })
    .min(5, 'Address must be at least 5 characters long'),
  price: z
    .number({
      required_error: 'Price is required and must be a number',
    }),
  sqft: z
    .number({
      required_error: 'Square feet is required',
    })
    .positive('Square feet must be a positive number'),
  beds: z
    .number({
      required_error: 'Number of beds is required',
    })
    .positive('Number of beds must be a positive number'),
  baths: z
    .number({
      required_error: 'Number of baths is required',
    })
    .positive('Number of baths must be a positive number'),
  type: listingTypeEnum,
  status: statusTypeEnum,
  propertyFeatures: z.array(z.string(), {
    required_error: 'Property features are required',
  }),
  details: listingDetailsSchema,
});

// Schema for updating a listing (allows partial updates)
const updateListingValidationSchema =
  createListingValidationSchema.deepPartial();

// Export the validation schemas
export const listingValidation = {
  createListingValidationSchema,
  updateListingValidationSchema,
};
