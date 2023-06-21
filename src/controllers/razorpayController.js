// import Stripe from 'stripe';
// import { data } from '../utils/cartData.js';
import Razorpay from 'razorpay';
import generateHmacSha256Hash from '../utils/validateRazorpayPay.js';
import appError from '../validations/appError.js';

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_PUBLIC_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY
});

export const createCheckout = async (req, res) => {
  try {
    const options = {
      amount: 50000, // amount in paisa
      currency: 'INR',
      receipt: 'Test payment for test user'
    };
    const pay = await instance.orders.create(options);
    return res.status(200).send({
      success: true,
      msg: 'success',
      data: pay
    });
  } catch (error) {
    appError(res, error);
  }
};

export const validatePayment = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const hash = generateHmacSha256Hash(req.body);
    console.log('hash', hash);
    if (hash === req.body.razorpay_signature) {
      return res.status(200).send({
        success: true,
        msg: 'payment successful',
        data: {}
      });
    } else {
      return res.status(400).send({
        success: false,
        msg: 'Payment is not verified with our server',
        data: {}
      });
    }

    //  const pay = await instance.payments.all({
    //    from: '2016-08-01',
    //    to: '2023-06-21'
    //  });
    //  console.log('pay', pay);
    //  return res.status(200).send({
    //    success: true,
    //    msg: 'success',
    //    data: pay
    //  });
  } catch (error) {
    appError(res, error);
  }
};
export const getTransaction = async (req, res) => {
  try {
    console.log('req.body', req.body);
    const pay = await instance.payments.all({
      from: '2016-08-01',
      to: '2023-06-21'
    });
    console.log('pay', pay);
    return res.status(200).send({
      success: true,
      msg: 'success',
      data: pay
    });
  } catch (error) {
    appError(res, error);
  }
};

export const webhookPaymentStatus = async (req, res) => {
  try {
    console.log('webhook', req.body);
    console.log('webhook', req.query);
  } catch (error) {}
};
