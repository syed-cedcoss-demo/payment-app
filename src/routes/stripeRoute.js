import express from 'express';
import {
  createCheckout,
  paymentFailed,
  paymentSuccess,
  webhookPaymentStatus
} from '../controllers/stripeController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

router.post('/create-checkout-session', auth, createCheckout);
router.get('/payment-success', paymentSuccess);
router.get('/payment-failed', paymentFailed);
router.get('/webhook-payment-status', webhookPaymentStatus);

// WEBHOOK LISTENER
router.post('/webhook-payment-status', webhookPaymentStatus);

export default router;
