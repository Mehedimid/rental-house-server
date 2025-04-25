import { Request, Response } from 'express';
import { frontendBaseUrl } from '../../utils/baseUrl';
import Booking from '../booking/booking.model';

export const successPayment = async (req: Request, res: Response) => {
  console.log('bookingId from success', req.params.bookingId);
  const isStatusTrue = await Booking.findByIdAndUpdate(
    req.params.bookingId,
    { paymentStatus: true },
    { new: true },
  );

  if (!isStatusTrue) return;
  const redirectUrl = `${frontendBaseUrl}/payment/success/${req.params.tran_id}`;
  console.log(req.params.bookingId);
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
