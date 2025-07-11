// import { useEffect, useState } from 'react';
// import API from '../axios';

// export default function OrderPage() {
//   const [productOrders, setProductOrders] = useState([]);
//   const [serviceOrders, setServiceOrders] = useState([]);
//   const [serviceFilter, setServiceFilter] = useState('all');
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchOrders = async () => {
//     try {
//       const res = await API.get('/orders');
//       setProductOrders(res.data.productOrders || []);
//       setServiceOrders(res.data.serviceOrders || []);
//     } catch (err) {
//       console.error('❌ Failed to fetch orders:', err);
//       setError('Something went wrong. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchOrders();
// }, []);

//   const filteredServices = serviceOrders.filter((s) =>
//     serviceFilter === 'all' ? true : s.service?.type === serviceFilter
//   );

//   if (error) {
//     return <div className="p-4 text-red-600">{error}</div>;
//   }

//   if (loading) {
//     return <div className="p-4 text-gray-500">Loading orders...</div>;
//   }

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-6">My Orders 📦</h1>

//       <div className="grid grid-cols-3 md:grid-cols-2 gap-4">
//         {/* Product Orders */}
//         <div className="bg-white shadow rounded p-4">
//           <h2 className="text-xl font-semibold mb-4">Product Orders 🛒</h2>
//           {productOrders.length === 0 ? (
//             <p className="text-gray-500">No product orders yet.</p>
//           ) : (
//             productOrders.map((order, i) => (
//               <div key={i} className="border p-3 rounded mb-2">
//                 <p className="font-bold">{order.product?.name || 'Unknown Product'}</p>
//                 <p>Paid: ₹{order.amount}</p>
//                 <p>Paid via Wallet: {order.paidViaWallet ? 'Yes' : 'No'}</p>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Service Orders */}
//         <div className="bg-white shadow rounded p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">Service Orders 🧰</h2>
//             <select
//               value={serviceFilter}
//               onChange={(e) => setServiceFilter(e.target.value)}
//               className="border px-2 py-1 rounded text-sm"
//             >
//               <option value="all">All</option>
//               <option value="free">Free</option>
//               <option value="paid">Paid</option>
//             </select>
//           </div>
//           {filteredServices.length === 0 ? (
//             <p className="text-gray-500">No service orders yet.</p>
//           ) : (
//             filteredServices.map((order, i) => (
//               <div key={i} className="border p-3 rounded mb-2">
//                 <p className="font-bold">{order.service?.title || 'Unknown Service'}</p>
//                 <p>Type: {order.service?.type || 'N/A'}</p>
//                 <p>Address: {order.address || 'N/A'}</p>
//                 <p>Date: {order.date || 'N/A'} at {order.time || 'N/A'}</p>
//                 <p>Total: ₹{order.totalAmount}</p>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import API from '../axios';

export default function OrderPage() {
  const [productOrders, setProductOrders] = useState([]);
  const [serviceOrders, setServiceOrders] = useState([]);
  const [serviceFilter, setServiceFilter] = useState('all');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders');
        setProductOrders(res.data.productOrders || []);
        setServiceOrders(res.data.serviceOrders || []);
      } catch (err) {
        console.error('❌ Failed to fetch orders:', err);
        setError('Something went wrong. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredServices = serviceOrders.filter((s) =>
    serviceFilter === 'all' ? true : s.service?.type === serviceFilter
  );

  if (error) {
    return <div className="p-4 text-center text-red-600 font-medium">{error}</div>;
  }

  if (loading) {
    return <div className="p-4 text-center text-gray-500">Loading orders...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">My Orders 📦</h1>

        <div className="grid grid-cols-3 md:grid-cols-3 gap-6">
          {/* ✅ Product Orders */}
          <div className="bg-white shadow-md rounded-xl p-5">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Product Orders 🛒</h2>
            {productOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No product orders yet.</p>
            ) : (
              productOrders.map((order, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-md mb-3 text-sm"
                >
                  <p className="font-semibold text-gray-700">
                    {order.product?.name || 'Unknown Product'}
                  </p>
                  <p className="text-gray-600">Paid: ₹{order.amount}</p>
                  <p className="text-gray-600">
                    Paid via Wallet:{' '}
                    <span className={order.paidViaWallet ? 'text-green-600' : 'text-red-500'}>
                      {order.paidViaWallet ? 'Yes' : 'No'}
                    </span>
                  </p>
                </div>
              ))
            )}
          </div>

          {/* ✅ Service Orders */}
          <div className="bg-white shadow-md rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Service Orders 🧰</h2>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="border px-3 py-1 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="free">Free</option>
                <option value="paid">Paid</option>
              </select>
            </div>
            {filteredServices.length === 0 ? (
              <p className="text-gray-500 text-sm">No service orders yet.</p>
            ) : (
              filteredServices.map((order, i) => (
                <div
                  key={i}
                  className="bg-gray-50 border border-gray-200 p-4 rounded-md mb-3 text-sm"
                >
                  <p className="font-semibold text-gray-700">
                    {order.service?.title || 'Unknown Service'}
                  </p>
                  <p className="text-gray-600 capitalize">Type: {order.service?.type || 'N/A'}</p>
                  <p className="text-gray-600">Address: {order.address || 'N/A'}</p>
                  <p className="text-gray-600">
                    Date: {order.date || 'N/A'} at {order.time || 'N/A'}
                  </p>
                  <p className="text-gray-800 font-medium mt-1">Total: ₹{order.totalAmount}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
