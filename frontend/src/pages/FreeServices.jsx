import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

const apiRoot = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

function FallbackImage({ src, alt }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasErrored(false);
  }, [src]);

  return (
    <img
      src={hasErrored ? '/fallback.jpg' : imgSrc}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setHasErrored(true)}
    />
  );
}

export default function FreeServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/services')
      .then((res) => setServices(res.data))
      .catch((err) => {
        console.error('❌ Error loading services:', err);
        setServices([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const freeServices = services.filter((s) => s.type === 'free');

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800 drop-shadow-sm">Elite-Crew 🆓</h1>
        <p className="text-gray-600 mt-1 text-lg">Explore Free Services</p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading services...</p>
      ) : freeServices.length === 0 ? (
        <p className="text-center text-gray-500">No free services available at the moment.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {freeServices.map((s) => (
            <div
              key={s._id}
              className="bg-white shadow-md border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all"
            >
              <FallbackImage src={`${apiRoot}/uploads/${s.image}`} alt={s.title || 'Service'} />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">{s.title}</h2>
                <p className="text-sm text-gray-600 line-clamp-2">{s.description}</p>
                <p className="text-green-600 font-semibold mt-2">Free Service</p>
                <button
                  onClick={() => navigate(`/services/book/${s._id}`)}
                  className="mt-3 w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg text-sm font-medium"
                >
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
