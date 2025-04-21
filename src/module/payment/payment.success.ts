import { Request, Response } from 'express';
import { frontendBaseUrl } from '../../utils/baseUrl';
import Booking from '../booking/booking.model';

export const successPayment = async (req: Request, res: Response) => {
  await Booking.findOneAndUpdate(
    { transactionId: req.params.tran_id },
    { status: 'paid' },
    { new: true },
  );

  const redirectUrl = `${frontendBaseUrl}/listings/success-payment/${req.params.tran_id}`;

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
