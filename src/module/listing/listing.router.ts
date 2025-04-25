import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { listingValidation } from './listing.validation';
import { listingControllers } from './listing.controller';

const listingRouter = express.Router();

listingRouter.get('/landlord/:landlordId', listingControllers.getLandlordListing);

// Create a new rental house listing
listingRouter.post(
  '/create-listing',
  validateRequest(listingValidation.createListingValidationSchema),
  listingControllers.createListing,
);

listingRouter.get('/:id', listingControllers.getSingleListing);

// Retrieve all rental listing posted by the landlord
listingRouter.get('/', listingControllers.getAllListing);

// Update a specific rental listing
listingRouter.patch(
  '/:id',
  validateRequest(listingValidation.updateListingValidationSchema),
  listingControllers.updateListing,
);

// Remove a rental listing
listingRouter.delete('/:id', listingControllers.deleteListing);

export default listingRouter;
