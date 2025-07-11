
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../axios';

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [address, setAddress] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('phonepe');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="p-4 text-center text-gray-600">Loading...</p>;

  const gst = (product.price * (product.gstPercent / 100)).toFixed(2);
  const tds = (product.price * (product.tdsPercent / 100)).toFixed(2);
  const total = (product.price + parseFloat(gst) + parseFloat(tds)).toFixed(2);

  const placeOrder = async () => {
    if (!address.trim()) {
      alert('Please enter a delivery address.');
      return;
    }

    setLoading(true);

    try {
      if (paymentMethod === 'wallet') {
        // Use wallet payment
        await API.post(
          '/orders',
          { productId: product._id, useWallet: true },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        alert('✅ Order placed successfully using wallet!');
        navigate('/orders');
      } else {
        // Use PhonePe payment
        const response = await API.post(
          '/payments/product',
          { productId: product._id, useWallet: false },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (response.data.success) {
          // Redirect to PhonePe payment page
          window.location.href = response.data.paymentUrl;
        } else {
          alert('❌ Payment initiation failed');
        }
      }
    } catch (err) {
      alert(err.response?.data?.message || '❌ Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-52 object-cover"
        />
        <div className="p-5">
          <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
          <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
          <p className="text-lg text-green-600 font-semibold mt-3">
            ₹{product.price}
          </p>

          <button
            onClick={() => setShowDetails(true)}
            className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md text-sm transition"
          >
            Buy Now
          </button>

          {showDetails && (
            <div className="mt-6 bg-gray-100 border border-gray-300 rounded-md p-4">
              <label className="block mb-2 text-sm font-medium">Delivery Address</label>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter delivery address"
                className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <div className="text-sm text-gray-700 mt-4 space-y-1">
                <p>GST ({product.gstPercent}%): ₹{gst}</p>
                <p>TDS ({product.tdsPercent}%): ₹{tds}</p>
                <h2 className="font-bold text-base mt-2">Total: ₹{total}</h2>
              </div>

              <div className="mt-4 space-y-3">
                <h3 className="font-medium text-gray-800">Payment Method:</h3>
                
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="phonepe"
                    checked={paymentMethod === 'phonepe'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="flex items-center gap-2">
                    <span className="text-purple-600 font-semibold">PhonePe</span>
                    <span className="text-xs text-gray-500">(UPI, Cards, Net Banking)</span>
                  </span>
                </label>

                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span className="flex items-center gap-2">
                    <span className="text-green-600 font-semibold">Wallet</span>
                    <span className="text-xs text-gray-500">(Use available balance)</span>
                  </span>
                </label>
              </div>

              <button
                onClick={placeOrder}
                disabled={loading}
                className={`mt-4 w-full py-2 rounded-md text-sm transition ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? 'Processing...' : 'Confirm & Pay'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
