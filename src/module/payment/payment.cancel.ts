/* eslint-disable @typescript-eslint/no-unused-vars */
import { frontendBaseUrl } from "../../utils/baseUrl";
import { Request, Response } from "express";
import Booking from "../booking/booking.model";

export const cancelPayment = async (req: Request, res: Response) => {
await Booking.findOneAndUpdate(
    { transactionId: req.params.tran_id },
    { paymentStatus: false },
    { new: true },
  );


  const redirectUrl = `${frontendBaseUrl}/listings/cancel-payment/${req.params.tran_id}`;
  
  const html = `
    <html>
      <head>
        <meta http-equiv="refresh" content="0; URL='${redirectUrl}'" />
        <script>window.location.href='${redirectUrl}'</script>
      </head>
      <body>
        Redirecting...
      </body>
    </html>
  `;

  res.status(200).send(html);
};
