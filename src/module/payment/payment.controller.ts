import { z } from 'zod';
import { Request, Response } from 'express';
import SSLCommerzPayment from 'sslcommerz-lts';
import { backendBaseUrl } from '../../utils/baseUrl';
import { Listing } from '../listing/listing.model';
import {  User } from '../user/user.model';

const is_live = false;

const initiatePaymentResponseSchema = z.object({
  GatewayPageURL: z.string().min(1),
});

type InitiatePaymentResponse = z.infer<typeof initiatePaymentResponseSchema>;

export const initiatePayment = async (req: Request, res: Response) => {
  const bookingData = req.body;
  const bookingHouse = await Listing.findById(bookingData.listing);

  const tenant = await User.findById(bookingData.tenant)

  const name = tenant?.name || "name"
  const email = tenant?.email || "email"
  const phone = tenant?.phone || "01867875888"

  const tran_id = Date.now()

  const data = {
    total_amount: tran_id,
    currency: 'BDT',
    tran_id: tran_id,
    success_url: `${backendBaseUrl}/api/payment/success/${tran_id}`,
    fail_url: `${backendBaseUrl}/api/payment/failed/${tran_id}`,
    cancel_url: `${backendBaseUrl}/api/payment/cancel/${tran_id}`,
    ipn_url: `${backendBaseUrl}/ipn`,
    shipping_method: 'Courier',
    product_name: bookingHouse?.title ,
    product_category: bookingHouse?.type ,
    product_profile: 'general',
    cus_name: name ,
    cus_email: email ,
    cus_add1: bookingData?.address,
    cus_add2: bookingData?.address,
    cus_city: 'Dhaka',
    cus_state: 'Dhaka',
    cus_postcode: '1000',
    cus_country: 'Bangladesh',
    cus_phone: phone , 
    cus_fax: '01711111111',
    ship_add1: bookingData?.address, 
    ship_name: name,
    ship_city: 'dhaka',
    ship_postcode: '1000',
    ship_country: 'bd',
  };

  const sslcz = new SSLCommerzPayment(process.env.STORE_ID, process.env.STORE_PASS, is_live);

  sslcz
    .init(data)
    .then((apiResponse: InitiatePaymentResponse) => {
      const parseResult = initiatePaymentResponseSchema.safeParse(apiResponse);

      if (!parseResult.success) {
        return res.status(500).json({
          message: 'Invalid API response',
          error: parseResult.error.errors,
        });
      }

      const { GatewayPageURL } = parseResult.data;
      res.status(200).json({ url: GatewayPageURL });
    })
    .catch((error: any) => {
      res.status(500).json({ message: 'Payment initiation failed', error });
    });
};
