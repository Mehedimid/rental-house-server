import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { listingServices } from './listing.service';

const createListing = catchAsync(async (req: Request, res: Response) => {
  const listingData = await listingServices.createListing(req.body);
  sendResponse(res, {
    statusCode: 201,
    message: 'Listing created successfully',
    data: listingData,
  });
});

const getSingleListing = catchAsync(
  async (req: Request, res: Response) => {
    const listingId = req.params.id;
    const listing = await listingServices.getSingleListing(listingId);
    sendResponse(res, {
      statusCode: 200,
      message: 'Listing fetched successfully',
      data: listing,
    });
  },
);

const getAllListing = catchAsync(async (req: Request, res: Response) => {
  const listings = await listingServices.getAllListing(req.query);
  sendResponse(res, {
    statusCode: 200,
    message: 'Listings fetched successfully',
    data: listings,
  });
});

const updateListing = catchAsync(async (req: Request, res: Response) => {
  const listingId = req.params.id;
  const updatedData = req.body;
  const updatedListing = await listingServices.updateListing(
    listingId,
    updatedData,
  );
  sendResponse(res, {
    statusCode: 200,
    message: 'Listing updated successfully',
    data: updatedListing,
  });
});

const deleteListing = catchAsync(async (req: Request, res: Response) => {
  const listingId = req.params.id;
  const deleteListing = await listingServices.deleteListing(listingId);
  sendResponse(res, {
    statusCode: 200,
    message: 'Listing deleted successfully',
    data: deleteListing,
  });
});

export const listingControllers = {
  createListing,
  getSingleListing,
  getAllListing,
  updateListing,
  deleteListing,
};
