// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import API from '../axios';

// export default function BookService() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [service, setService] = useState(null);
//   const [address, setAddress] = useState('');
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [useWallet, setUseWallet] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchService = async () => {
//       try {
//         const res = await API.get(`/services/${id}`);
//         setService(res.data);
//       } catch (err) {
//         console.error('❌ Failed to load service:', err);
//         alert('Service not found');
//         navigate('/services');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchService();
//   }, [id, navigate]);

//   const handleBooking = async () => {
//     if (!address || !date || !time) {
//       alert('⚠️ Please fill in all booking details.');
//       return;
//     }

//     try {
//       await API.post(
//         '/service-orders',
//         {
//           serviceId: service._id,
//           address,
//           date,
//           time,
//           useWallet,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem('token')}`,
//           },
//         }
//       );

//       alert('✅ Service booked successfully!');
//       navigate('/orders');
//     } catch (err) {
//       console.error('❌ Booking failed:', err);
//       alert(err.response?.data?.message || 'Booking failed');
//     }
//   };

//   if (loading) return <p className="p-4 text-center">Loading service details...</p>;
//   if (!service) return null;

//   const gst = (service.price * (service.gstPercent / 100)).toFixed(2);
//   const tds = (service.price * (service.tdsPercent / 100)).toFixed(2);
//   const total = (parseFloat(service.price) + parseFloat(gst) + parseFloat(tds)).toFixed(2);

//   return (
//     <div className="max-w-xl mx-auto p-4 bg-white shadow rounded mt-6">
//       <h1 className="text-2xl font-bold mb-2">{service.title}</h1>
//       <img
//         src={service.image || '/fallback.jpg'}
//         alt={service.title}
//         className="w-full h-48 object-cover rounded mb-4"
//       />
//       <p className="text-gray-700 mb-4">{service.description}</p>

//       <input
//         type="text"
//         placeholder="Enter your address"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         className="w-full p-2 border rounded mb-3"
//       />

//       <div className="flex gap-2 mb-3">
//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//           className="w-1/2 p-2 border rounded"
//         />
//         <input
//           type="time"
//           value={time}
//           onChange={(e) => setTime(e.target.value)}
//           className="w-1/2 p-2 border rounded"
//         />
//       </div>

//       <div className="mb-3 text-sm text-gray-700">
//         <p>Base Price: ₹{service.price}</p>
//         <p>GST ({service.gstPercent}%): ₹{gst}</p>
//         <p>TDS ({service.tdsPercent}%): ₹{tds}</p>
//         <p className="font-semibold text-black">Total: ₹{total}</p>
//       </div>

//       <label className="flex items-center gap-2 mb-4 text-sm">
//         <input
//           type="checkbox"
//           checked={useWallet}
//           onChange={() => setUseWallet(!useWallet)}
//         />
//         <span>Use wallet for payment</span>
//       </label>

//       <button
//         onClick={handleBooking}
//         className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//       >
//         Confirm Booking
//       </button>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../axios';

export default function BookService() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [service, setService] = useState(null);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [useWallet, setUseWallet] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('phonepe');
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await API.get(`/services/${id}`);
        setService(res.data);
      } catch (err) {
        console.error('❌ Failed to load service:', err);
        alert('Service not found');
        navigate('/services');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id, navigate]);

  const handleBooking = async () => {
    if (!address || !date || !time) {
      alert('⚠️ Please fill in all booking details.');
      return;
    }

    setBookingLoading(true);

    try {
      if (paymentMethod === 'wallet') {
        // Use wallet payment
        await API.post(
          '/service-orders',
          {
            serviceId: service._id,
            address,
            date,
            time,
            useWallet: true,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        alert('✅ Service booked successfully using wallet!');
        navigate('/orders');
      } else {
        // Use PhonePe payment
        const response = await API.post(
          '/payments/service',
          {
            serviceId: service._id,
            date,
            time,
            useWallet: false,
          },
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
      console.error('❌ Booking failed:', err);
      alert(err.response?.data?.message || 'Booking failed');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <p className="p-6 text-center text-gray-500">Loading service details...</p>;
  if (!service) return null;

  const gst = (service.price * (service.gstPercent / 100)).toFixed(2);
  const tds = (service.price * (service.tdsPercent / 100)).toFixed(2);
  const total = (parseFloat(service.price) + parseFloat(gst) + parseFloat(tds)).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-xl overflow-hidden">
        <img
          src={service.image || '/fallback.jpg'}
          alt={service.title}
          className="w-full h-48 object-cover"
        />

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{service.title}</h1>
          <p className="text-gray-600 mb-4">{service.description}</p>

          {/* Address */}
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Date & Time */}
          <div className="flex gap-3 mb-4">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-1/2 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price Details */}
          <div className="bg-gray-50 border rounded p-3 text-sm text-gray-700 mb-4">
            <p>Base Price: ₹{service.price}</p>
            <p>GST ({service.gstPercent}%): ₹{gst}</p>
            <p>TDS ({service.tdsPercent}%): ₹{tds}</p>
            <p className="font-semibold text-black mt-2">Total: ₹{total}</p>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-800 mb-2">Payment Method:</h3>
            
            <label className="flex items-center gap-2 mb-2">
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

          {/* Button */}
          <button
            onClick={handleBooking}
            disabled={bookingLoading}
            className={`w-full py-2 rounded transition ${
              bookingLoading
                ? 'bg-gray-400 cursor-not-allowed text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {bookingLoading ? 'Processing...' : 'Confirm Booking'}
          </button>
        </div>
      </div>
    </div>
  );
}
