import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, XCircle, Clock } from 'lucide-react';
import API from '../axios';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState('loading');
  const [paymentDetails, setPaymentDetails] = useState(null);

  const merchantTransactionId = searchParams.get('merchantTransactionId');
  const transactionId = searchParams.get('transactionId');
  const status = searchParams.get('status');

  useEffect(() => {
    if (merchantTransactionId) {
      checkPaymentStatus();
    } else {
      setPaymentStatus('error');
    }
  }, [merchantTransactionId]);

  const checkPaymentStatus = async () => {
    try {
      const response = await API.get(`/payments/status/${merchantTransactionId}`);
      setPaymentDetails(response.data);
      setPaymentStatus(response.data.status);
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus('error');
    }
  };

  const getStatusIcon = () => {
    switch (paymentStatus) {
      case 'success':
        return <CheckCircle className="w-16 h-16 text-green-500" />;
      case 'failed':
        return <XCircle className="w-16 h-16 text-red-500" />;
      case 'pending':
        return <Clock className="w-16 h-16 text-yellow-500" />;
      default:
        return <Clock className="w-16 h-16 text-gray-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (paymentStatus) {
      case 'success':
        return {
          title: 'Payment Successful! 🎉',
          message: 'Your payment has been processed successfully.',
          color: 'text-green-600',
        };
      case 'failed':
        return {
          title: 'Payment Failed ❌',
          message: 'Your payment could not be processed. Please try again.',
          color: 'text-red-600',
        };
      case 'pending':
        return {
          title: 'Payment Pending ⏳',
          message: 'Your payment is being processed. Please wait.',
          color: 'text-yellow-600',
        };
      default:
        return {
          title: 'Payment Status Unknown ❓',
          message: 'Unable to determine payment status.',
          color: 'text-gray-600',
        };
    }
  };

  const statusInfo = getStatusMessage();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        {getStatusIcon()}
        
        <h1 className={`text-2xl font-bold mt-4 ${statusInfo.color}`}>
          {statusInfo.title}
        </h1>
        
        <p className="text-gray-600 mt-2 mb-6">
          {statusInfo.message}
        </p>

        {paymentDetails && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Payment Details:</h3>
            <div className="space-y-1 text-sm">
              <p><span className="font-medium">Amount:</span> ₹{(paymentDetails.amount || 0).toFixed(2)}</p>
              <p><span className="font-medium">Transaction ID:</span> {paymentDetails.transactionId || 'N/A'}</p>
              <p><span className="font-medium">Order Type:</span> {paymentDetails.orderType || 'N/A'}</p>
              <p><span className="font-medium">Status:</span> 
                <span className={`ml-1 capitalize ${
                  paymentDetails.status === 'success' ? 'text-green-600' :
                  paymentDetails.status === 'failed' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {paymentDetails.status}
                </span>
              </p>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => navigate('/orders')}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition"
          >
            View Orders
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Home
          </button>
        </div>

        {paymentStatus === 'failed' && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 text-sm">
              If you were charged, the amount will be refunded within 3-5 business days.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 