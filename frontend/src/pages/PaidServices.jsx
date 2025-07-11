// src/pages/PaidServices.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

const apiRoot = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  return (
    <img
      src={error ? '/fallback.jpg' : src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
}

export default function PaidServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/services?type=paid')
      .then((res) => setServices(res.data))
      .catch(() => setServices([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-white to-blue-50">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 drop-shadow-sm">Elite-Crew 💰</h1>
        <p className="text-gray-600 mt-1 text-lg">Explore Paid Services</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading services...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500">No paid services available at the moment.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s) => (
            <div
              key={s._id}
              onClick={() => navigate(`/services/book/${s._id}`)}
              className="bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all cursor-pointer"
            >
              <ImageWithFallback
                src={`${apiRoot}/uploads/${s.image}`}
                alt={s.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">{s.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
                <p className="text-red-600 font-semibold mt-2">₹{s.price}</p>
                <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg text-sm font-medium">
                  Book Service
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
