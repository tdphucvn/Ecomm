import express from 'express';
import { createPaymentIntent } from '../controllers/payment';

const router = express.Router();

router.post('/create-payment-intent', createPaymentIntent);

export default router;