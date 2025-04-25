import express from 'express';
import { initiatePayment } from './payment.controller';
import { failedPayment } from './payment.fail';
import { cancelPayment } from './payment.cancel';
import { successPayment } from './payment.success';

const router = express.Router();

router.post('/initiate/:bookingId', initiatePayment);
router.post('/success/:tran_id/:bookingId', successPayment);
router.post('/failed/:tran_id', failedPayment);
router.post('/cancel/:tran_id', cancelPayment);

export const paymentRoutes = router;