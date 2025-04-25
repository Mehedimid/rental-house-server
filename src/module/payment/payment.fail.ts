import { frontendBaseUrl } from '../../utils/baseUrl';
import { Request, Response } from 'express';
import Booking from '../booking/booking.model';


export const failedPayment = async (req: Request, res: Response) => {
// await Booking.findOneAndUpdate(
//     { transactionId: req.params.tran_id },
//     { paymentStatus: false },
//     {  paymentStatus: false },
//   );


  const redirectUrl = `${frontendBaseUrl}/payment/failed/${req.params.tran_id}`;

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
