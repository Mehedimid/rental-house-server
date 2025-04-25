import mongoose from 'mongoose';
import { Listing } from './listing.model';


const createListing = async (payload: any) => {
  if (typeof payload.landlord === 'string') {
    payload.landlord = new mongoose.Types.ObjectId(payload.landlord);
  }

  const newListing = await Listing.create(payload);
  return newListing;
};

const getSingleListing = async (listingId: string) => {
  const listing = await Listing.findById(listingId).populate(
    'landlord',
    'name email phone',
  );
  return listing;
};

const getLandlordListing = async (landlordId: string) => {
  const objectId = new mongoose.Types.ObjectId(landlordId);
  if (!mongoose.Types.ObjectId.isValid(landlordId)) {
    throw new Error('Invalid landlord ID');
  }
  const toStrLandlordId = objectId.toString()
  const listings = await Listing.find()

  const landlords = listings.filter(item => 
    item?.landlord?.toString() === objectId.toString()
  );

  
  const listing = await Listing.find({landlord:toStrLandlordId}).lean().populate(
    'landlord',
    'name email phone',
  );
  return listing
};

const getAllListing = async (query: Record<string, unknown>) => {
  const queryObj = { ...query };

  const excludeFields = [
    'searchTerm',
    'page',
    'limit',
    'sortOrder',
    'sortBy',
    'fields',
    'minPrice',
    'maxPrice',
    'beds',
    'rooms',
    'baths'
  ];
  excludeFields.forEach((key) => delete queryObj[key]);

  // Search term
  const searchTerm = query.searchTerm || '';
  const searchFields = ['title', 'type', 'address'];
  const searchConditions = searchTerm
    ? {
        $or: searchFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: 'i' },
        })),
      }
    : {};

  // Price filtering
  const priceFilter: Record<string, any> = {};
  if (query.minPrice) {
    priceFilter.$gte = Number(query.minPrice);
  }
  if (query.maxPrice) {
    priceFilter.$lte = Number(query.maxPrice);
  }
  if (Object.keys(priceFilter).length > 0) {
    queryObj.price = priceFilter;
  }

  if (query.beds) queryObj.beds = Number(query.beds);
  if (query.baths) queryObj.baths = Number(query.baths);
  if (query.type) queryObj.type = query.type;

  const baseQuery = Listing.find({
    ...searchConditions,
    ...queryObj,
  }).populate('landlord');

  // 🔢 Total count before pagination
  const total = await Listing.countDocuments({
    ...searchConditions,
    ...queryObj,
  });

  const page = Number(query?.page || 1);
  const limit = Number(query?.limit) || 10;
  const skip = (page - 1) * limit;

  // Sorting
  let sortStr;
  if (query?.sortBy && query.sortOrder) {
    const sortBy = query.sortBy;
    const sortOrder = query.sortOrder;
    sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`;
  }

  let queryExec = baseQuery.skip(skip).limit(limit);
  if (sortStr) {
    queryExec = queryExec.sort(sortStr);
  }

  const fields = query?.fields
    ? (query.fields as string).split(',').join(' ')
    : '-__v';

  const listings = await queryExec.select(fields);

  // ✅ Return paginated results and metadata
  return {
    data: listings,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

const updateListing = async (listingId: string, payload: any) => {
  const updatedListing = await Listing.findByIdAndUpdate(listingId, payload, {
    new: true,
  });
  if (!updatedListing) {
    throw new Error('Listing not found');
  }
  return updatedListing;
};

const deleteListing = async (listingId: string) => {
  const deletedListing = await Listing.findByIdAndDelete(listingId);
  return deletedListing;
};

export const listingServices = {
  createListing,
  getAllListing,
  getSingleListing,
  updateListing,
  deleteListing,
  getLandlordListing
};
