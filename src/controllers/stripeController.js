import Stripe from 'stripe';
import { data } from '../utils/cartData.js';
import appError from '../validations/appError.js';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckout = async (req, res) => {
  try {
    const items = [];
    data?.forEach((item) => {
      items.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item?.name,
            images: [item.imgUrl]
          },
          unit_amount: parseFloat(item?.price * 100)
        },
        quantity: 1
      });
    });
    const session = await stripe.checkout.sessions.create({
      line_items: items,
      payment_method_types: ['card'],
      mode: 'payment',
      success_url:
        'http://localhost:3002/stripe/payment-success?session_id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3002/stripe/payment-failed',
      customer_email: 'syed-hasnain@yopmail.com',
      metadata: {
        userId: req?.userId
      },
      invoice_creation: {
        enabled: true
      }
    });
    res.json({ url: session.url });
  } catch (error) {
    appError(res, error);
  }
};

export const paymentSuccess = async (req, res) => {
  try {
    console.log('req?.query', req?.query?.session_id);
    // const session = await stripe.checkout.sessions.retrieve(req?.query?.session_id);
    // const customer = await stripe.customers.retrieve(session?.customer);
    // console.log('session', session);
    // const invoice = await stripe.invoices.retrieve(session?.invoice);
    // console.log('invoice', invoice);
    res.redirect(`${process.env.APP_URL}/payment-success`);
  } catch (error) {
    appError(res, error);
  }
};

export const paymentFailed = async (req, res) => {
  try {
    res.redirect(`${process.env.APP_URL}/payment-success`);
  } catch (error) {}
};

export const webhookPaymentStatus = async (req, res) => {
  try {
    console.log('req.body', req.body);
    console.log('req.body', req.query);
  } catch (error) {}
};
