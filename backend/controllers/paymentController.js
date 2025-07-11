import crypto from 'crypto';
import axios from 'axios';
import Payment from '../models/Payment.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Service from '../models/Service.js';
import Order from '../models/Order.js';
import ServiceOrder from '../models/ServiceOrder.js';

// PhonePe Configuration
const PHONEPE_CONFIG = {
  MERCHANT_ID: process.env.PHONEPE_MERCHANT_ID || 'PGTESTPAYUAT',
  SALT_KEY: process.env.PHONEPE_SALT_KEY || '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399',
  SALT_INDEX: process.env.PHONEPE_SALT_INDEX || '1',
  BASE_URL: process.env.PHONEPE_BASE_URL || 'https://api-preprod.phonepe.com/apis/pg-sandbox',
  REDIRECT_URL: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Generate checksum for PhonePe
const generateChecksum = (payload) => {
  const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const string = base64 + '/pg/v1/pay' + PHONEPE_CONFIG.SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = sha256 + '###' + PHONEPE_CONFIG.SALT_INDEX;
  console.log('Checksum generation:', {
    base64,
    string: string.substring(0, 50) + '...',
    checksum: checksum.substring(0, 20) + '...'
  });
  return checksum;
};

// Verify checksum from PhonePe callback
const verifyChecksum = (payload, checksum) => {
  const base64 = Buffer.from(JSON.stringify(payload)).toString('base64');
  const string = base64 + '/pg/v1/status/' + PHONEPE_CONFIG.MERCHANT_ID + '/' + payload.merchantTransactionId + PHONEPE_CONFIG.SALT_KEY;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const calculatedChecksum = sha256 + '###' + PHONEPE_CONFIG.SALT_INDEX;
  return calculatedChecksum === checksum;
};

// Initialize PhonePe payment for products
export const initiateProductPayment = async (req, res) => {
  try {
    const { productId, useWallet } = req.body;
    const userId = req.user._id;

    // Get product and user details
    const product = await Product.findById(productId);
    const user = await User.findById(userId);

    if (!product || !user) {
      return res.status(404).json({ message: 'Product or user not found' });
    }

    // Calculate total amount
    const gst = product.price * (product.gstPercent / 100);
    const tds = product.price * (product.tdsPercent / 100);
    const total = product.price + gst + tds;

    // If wallet payment is requested
    if (useWallet) {
      if (user.wallet < total) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
      }

      // Deduct from wallet and create order
      user.wallet -= total;
      await user.save();

      const order = await Order.create({
        user: userId,
        product: productId,
        amount: total,
        paidViaWallet: true,
      });

      return res.status(201).json({
        message: 'Order placed successfully using wallet',
        order,
        paymentMethod: 'wallet',
      });
    }

    // Generate unique transaction ID
    const merchantTransactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const orderId = 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // Create payment record
    const payment = await Payment.create({
      user: userId,
      orderId,
      merchantTransactionId,
      amount: total * 100, // PhonePe expects amount in paise
      currency: 'INR',
      paymentMethod: 'phonepe',
      orderType: 'product',
      orderReference: productId,
      callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/payments/callback`,
      redirectUrl: `${PHONEPE_CONFIG.REDIRECT_URL}/payment/success`,
    });

    // Prepare PhonePe payload
    const payload = {
      merchantId: PHONEPE_CONFIG.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: user.user_uni_id,
      amount: total * 100,
      redirectUrl: `${PHONEPE_CONFIG.REDIRECT_URL}/payment/success`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/payments/callback`,
      mobileNumber: user.phone || '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    // Generate checksum
    const checksum = generateChecksum(payload);
    payment.checksum = checksum;
    await payment.save();

    // Log the request details for debugging
    console.log('PhonePe Request:', {
      url: `${PHONEPE_CONFIG.BASE_URL}/pg/v1/pay`,
      payload,
      checksum: checksum.substring(0, 20) + '...',
      config: PHONEPE_CONFIG
    });

    // Make request to PhonePe
    const response = await axios.post(
      `${PHONEPE_CONFIG.BASE_URL}/pg/v1/pay`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      }
    );

    console.log('PhonePe Response:', {
      status: response.status,
      success: response.data.success,
      data: response.data
    });

    if (response.data.success) {
      payment.phonepeResponse = response.data;
      await payment.save();

      res.json({
        success: true,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
        merchantTransactionId,
        orderId,
      });
    } else {
      payment.status = 'failed';
      payment.phonepeResponse = response.data;
      await payment.save();
      
      console.error('PhonePe payment failed:', response.data);
      res.status(400).json({ 
        message: 'Payment initiation failed',
        error: response.data.message || 'Unknown error',
        code: response.data.code
      });
    }
  } catch (error) {
    console.error('Payment initiation error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    
    // Update payment status to failed
    if (payment) {
      payment.status = 'failed';
      payment.phonepeResponse = {
        error: error.message,
        response: error.response?.data
      };
      await payment.save();
    }
    
    res.status(500).json({ 
      message: 'Payment initiation failed',
      error: error.message,
      details: error.response?.data
    });
  }
};

// Initialize PhonePe payment for services
export const initiateServicePayment = async (req, res) => {
  try {
    const { serviceId, date, time, useWallet } = req.body;
    const userId = req.user._id;

    // Get service and user details
    const service = await Service.findById(serviceId);
    const user = await User.findById(userId);

    if (!service || !user) {
      return res.status(404).json({ message: 'Service or user not found' });
    }

    // Calculate total amount
    const gst = service.price * (service.gstPercent / 100);
    const tds = service.price * (service.tdsPercent / 100);
    const total = service.price + gst + tds;

    // If wallet payment is requested
    if (useWallet) {
      if (user.wallet < total) {
        return res.status(400).json({ message: 'Insufficient wallet balance' });
      }

      // Deduct from wallet and create service order
      user.wallet -= total;
      await user.save();

      const serviceOrder = await ServiceOrder.create({
        user: userId,
        service: serviceId,
        date,
        time,
        totalAmount: total,
        paidViaWallet: true,
      });

      return res.status(201).json({
        message: 'Service booked successfully using wallet',
        order: serviceOrder,
        paymentMethod: 'wallet',
      });
    }

    // Generate unique transaction ID
    const merchantTransactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const orderId = 'ORDER_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    // Create payment record
    const payment = await Payment.create({
      user: userId,
      orderId,
      merchantTransactionId,
      amount: total * 100, // PhonePe expects amount in paise
      currency: 'INR',
      paymentMethod: 'phonepe',
      orderType: 'service',
      orderReference: serviceId,
      callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/payments/callback`,
      redirectUrl: `${PHONEPE_CONFIG.REDIRECT_URL}/payment/success`,
    });

    // Prepare PhonePe payload
    const payload = {
      merchantId: PHONEPE_CONFIG.MERCHANT_ID,
      merchantTransactionId: merchantTransactionId,
      merchantUserId: user.user_uni_id,
      amount: total * 100,
      redirectUrl: `${PHONEPE_CONFIG.REDIRECT_URL}/payment/success`,
      redirectMode: 'POST',
      callbackUrl: `${process.env.BACKEND_URL || 'http://localhost:8000'}/api/payments/callback`,
      mobileNumber: user.phone || '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    };

    // Generate checksum
    const checksum = generateChecksum(payload);
    payment.checksum = checksum;
    await payment.save();

    // Make request to PhonePe
    const response = await axios.post(
      `${PHONEPE_CONFIG.BASE_URL}/pg/v1/pay`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-VERIFY': checksum,
        },
      }
    );

    if (response.data.success) {
      payment.phonepeResponse = response.data;
      await payment.save();

      res.json({
        success: true,
        paymentUrl: response.data.data.instrumentResponse.redirectInfo.url,
        merchantTransactionId,
        orderId,
      });
    } else {
      payment.status = 'failed';
      await payment.save();
      res.status(400).json({ message: 'Payment initiation failed' });
    }
  } catch (error) {
    console.error('Service payment initiation error:', error);
    res.status(500).json({ message: 'Payment initiation failed' });
  }
};

// PhonePe callback handler
export const paymentCallback = async (req, res) => {
  try {
    const { merchantTransactionId, transactionId, amount, status, checksum } = req.body;

    // Find payment record
    const payment = await Payment.findOne({ merchantTransactionId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Verify checksum
    if (!verifyChecksum(req.body, checksum)) {
      payment.status = 'failed';
      await payment.save();
      return res.status(400).json({ message: 'Invalid checksum' });
    }

    // Update payment status
    payment.status = status.toLowerCase();
    payment.transactionId = transactionId;
    payment.phonepeResponse = req.body;
    await payment.save();

    // If payment is successful, create order
    if (status === 'PAYMENT_SUCCESS') {
      if (payment.orderType === 'product') {
        const product = await Product.findById(payment.orderReference);
        const order = await Order.create({
          user: payment.user,
          product: payment.orderReference,
          amount: amount / 100, // Convert from paise to rupees
          paidViaWallet: false,
        });
      } else if (payment.orderType === 'service') {
        // For services, we need to get booking details from session or store them temporarily
        // This is a simplified version - you might want to store booking details in payment record
        const serviceOrder = await ServiceOrder.create({
          user: payment.user,
          service: payment.orderReference,
          date: new Date().toISOString().split('T')[0], // Default to today
          time: '10:00', // Default time
          totalAmount: amount / 100,
          paidViaWallet: false,
        });
      }
    }

    res.json({ success: true, status: payment.status });
  } catch (error) {
    console.error('Payment callback error:', error);
    res.status(500).json({ message: 'Callback processing failed' });
  }
};

// Check payment status
export const checkPaymentStatus = async (req, res) => {
  try {
    const { merchantTransactionId } = req.params;

    const payment = await Payment.findOne({ merchantTransactionId });
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // If payment is still pending, check with PhonePe
    if (payment.status === 'pending') {
      const response = await axios.get(
        `${PHONEPE_CONFIG.BASE_URL}/pg/v1/status/${PHONEPE_CONFIG.MERCHANT_ID}/${merchantTransactionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'X-VERIFY': payment.checksum,
            'X-MERCHANT-ID': PHONEPE_CONFIG.MERCHANT_ID,
          },
        }
      );

      if (response.data.success) {
        payment.status = response.data.data.paymentState.toLowerCase();
        payment.phonepeResponse = response.data;
        await payment.save();
      }
    }

    res.json({
      status: payment.status,
      amount: payment.amount / 100,
      orderType: payment.orderType,
      transactionId: payment.transactionId,
    });
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({ message: 'Failed to check payment status' });
  }
};

// Get user's payment history
export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const payments = await Payment.find({ user: userId })
      .populate('orderReference')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    console.error('Payment history error:', error);
    res.status(500).json({ message: 'Failed to fetch payment history' });
  }
}; 