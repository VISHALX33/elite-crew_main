import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import API from '../axios';

const apiRoot = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

// ✅ Fallback-safe image component
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

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    API.get(`/products/category/${category}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load category products:', err);
        setLoading(false);
      });
  }, [category]);

  const formatCategory = (cat) =>
    cat.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());

  return (
    <div className="p-4 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-3xl font-bold mb-8 text-center text-blue-800 drop-shadow-sm">
        {formatCategory(category)} Products
      </h1>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {products.map((prod) => (
            <div
              key={prod._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
            >
              <ImageWithFallback
                src={`${apiRoot}/uploads/${prod.image}`}
                alt={prod.name}
                className="h-48 w-full object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2 className="font-semibold text-lg text-gray-800 line-clamp-1">{prod.name}</h2>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2">{prod.description}</p>
                <p className="font-bold text-xl text-green-600 mb-3">₹{prod.price}</p>
                <button
                  onClick={() => navigate(`/product/${prod._id}`)}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded-lg text-sm font-medium"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
