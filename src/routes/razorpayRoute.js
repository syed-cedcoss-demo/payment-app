import express from 'express';
import {
  createCheckout,
  validatePayment,
  webhookPaymentStatus
} from '../controllers/razorpayController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-checkout-session', auth, createCheckout);
router.post('/validate-payment', auth, validatePayment);

// WEBHOOK LISTENER
router.post('/webhook-payment-status', webhookPaymentStatus);

export default router;
