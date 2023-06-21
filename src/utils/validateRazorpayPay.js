import crypto from 'crypto';

const generateHmacSha256Hash = (payload) => {
  const message = `${payload?.razorpay_order_id}|${payload?.razorpay_payment_id}`;
  console.log('message', message);
  console.log('serrect', process.env.RAZORPAY_SECRET_KEY);
  const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_SECRET_KEY);
  hmac.update(message);
  const hash = hmac.digest('hex');
  return hash;
};

export default generateHmacSha256Hash;
