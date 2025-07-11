import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { CardSkeleton } from '../components/Skeleton';
import Card from '../components/ui/Card';

const apiRoot = import.meta.env.VITE_API_BASE_URL.replace('/api', '');

function CategoryImage({ imageUrl, alt = 'Image' }) {
  const [imgSrc, setImgSrc] = useState(imageUrl || '/fallback.jpg');
  const [hasErrored, setHasErrored] = useState(false);

  useEffect(() => {
    setImgSrc(imageUrl || '/fallback.jpg');
    setHasErrored(false);
  }, [imageUrl]);

  return (
    <img
      src={hasErrored ? '/fallback.jpg' : imgSrc}
      alt={alt}
      className="w-full h-32 sm:h-36 object-cover rounded-md"
      onError={() => setHasErrored(true)}
    />
  );
}

export default function Home() {
  const [productCategories, setProductCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [paidServices, setPaidServices] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    API.get('/products/categories')
      .then(res => setProductCategories(res.data))
      .catch(() => {})
      .finally(() => setLoadingProducts(false));

    API.get('/services?type=free')
      .then(res => setServices(res.data))
      .catch(() => {})
      .finally(() => setLoadingServices(false));

    API.get('/services?type=paid')
      .then(res => setPaidServices(res.data))
      .catch(() => {});

    API.get('/blogs')
      .then(res => setBlogs(res.data))
      .catch(() => {})
      .finally(() => setLoadingBlogs(false));
  }, []);

  const SectionHeader = ({ title, subtitle, linkText, link }) => (
    <div className="flex justify-between items-center mt-12 mb-4">
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-600 text-sm">{subtitle}</p>
      </div>
      <button onClick={() => navigate(link)} className="text-blue-600 text-sm hover:underline">
        {linkText}
      </button>
    </div>
  );

  return (
    <div className="min-h-screen p-4 bg-gray-50">

      {/* Free Services */}
      <SectionHeader
        title="Free Services 🆓"
        subtitle="Book your desired free services"
        linkText="View All"
        link="/services?type=free"
      />
      {loadingServices ? (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : services.length === 0 ? (
        <Card className="text-center py-8">
          <p className="text-gray-500">No free services available at the moment.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {services.slice(0, 3).map((s) => (
            <Card
              key={s._id}
              variant="interactive"
              className="text-sm"
              onClick={() => navigate(`/services/book/${s._id}`)}
            >
              <CategoryImage imageUrl={`${apiRoot}/uploads/${s.image}`} alt={s.title} />
              <h2 className="font-semibold text-base mt-2">{s.title}</h2>
              <p className="text-gray-600 text-sm line-clamp-2">{s.description}</p>
              <p className="text-green-600 mt-1 font-semibold">Free Service</p>
              <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition">
                Book Service
              </button>
            </Card>
          ))}
        </div>
      )}

      {/* Paid Services */}
      <SectionHeader
        title="Paid Services 💰"
        subtitle="Explore premium services"
        linkText="View All"
        link="/services/paid"
      />
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {paidServices.slice(0, 3).map((s) => (
          <Card
            key={s._id}
            variant="interactive"
            className="text-sm"
            onClick={() => navigate(`/services/book/${s._id}`)}
          >
            <CategoryImage imageUrl={`${apiRoot}/uploads/${s.image}`} alt={s.title} />
            <h2 className="font-semibold text-base mt-2">{s.title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{s.description}</p>
            <p className="text-red-600 mt-1 font-semibold">₹{s.price}</p>
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700 transition">
              Book Service
            </button>
          </Card>
        ))}
      </div>

      {/* Product Categories */}
      <SectionHeader
        title="Product Categories 🛍️"
        subtitle="Explore our product categories"
        linkText="View All"
        link="/products"
      />
      {loadingProducts ? (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {productCategories.slice(0, 3).map((cat, i) => (
            <Card
              key={i}
              variant="interactive"
              className="text-center"
              onClick={() => navigate(`/category/${cat}`)}
            >
              <CategoryImage imageUrl={null} alt={cat} />
              <h2 className="mt-2 text-base font-semibold capitalize">{cat}</h2>
            </Card>
          ))}
        </div>
      )}

      {/* Blogs */}
      <SectionHeader
        title="Latest Blogs 📝"
        subtitle="Read what’s new from our users"
        linkText="View All"
        link="/blogs"
      />
      {loadingBlogs ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {blogs.slice(0, 3).map((b) => (
            <div key={b._id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md text-sm">
              <h3 className="font-bold text-lg mb-1">{b.title}</h3>
              <p className="text-gray-700 line-clamp-3">{b.content}</p>
              <p className="mt-2 text-xs text-gray-500">
                ❤️ {b.likes.length} Likes • 💬 {b.comments.length} Comments
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Videos */}
      <SectionHeader
        title="Watch Videos 📺"
        subtitle="Explore helpful video content"
        linkText="View All"
        link="/videos"
      />
      <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {[
          'https://www.youtube.com/embed/dQw4w9WgXcQ',
          'https://www.youtube.com/embed/ysz5S6PUM-U',
          'https://www.youtube.com/embed/3JZ_D3ELwOQ',
        ].map((url, idx) => (
          <div key={idx} className="aspect-video w-full rounded overflow-hidden shadow border">
            <iframe
              src={url}
              title={`Video ${idx + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
