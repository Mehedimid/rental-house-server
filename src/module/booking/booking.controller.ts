import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { StatusCodes } from "http-status-codes";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.createBooking(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Successfully created booking",
    data: result,
  });
});

const getBooking = catchAsync(async (req, res) => {
  const result = await bookingServices.getBooking();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched bookings",
    data: result,
  });
});

const getLandlordBooking = catchAsync(async (req, res) => {
  console.log(req.params.landlordId);
  const result = await bookingServices.getLandlordBooking(req.params.landlordId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched bookings",
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await bookingServices.getSingleBooking(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully fetched booking",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await bookingServices.cancelBooking(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "Successfully cancelled booking",
    data: result,
  });
});


const acceptBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await bookingServices.acceptBooking(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "booking request is accepted",
    data: result,
  });
});

const rejectBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await bookingServices.rejectBooking(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "booking request is rejected",
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await bookingServices.deleteBooking(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "booking request is rejected",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getBooking,
  getLandlordBooking,
  getSingleBooking,
  acceptBooking,
  rejectBooking,
  cancelBooking,
  deleteBooking
};
