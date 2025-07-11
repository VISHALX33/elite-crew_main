// src/App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Page Components
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Profile from './pages/Profile';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import OrderPage from './pages/OrderPage';
import FreeServices from './pages/FreeServices';
import BookService from './pages/BookService';
import Blogs from './pages/Blogs';
import Video from './pages/Video';
import PaidServices from './pages/PaidServices';
import PaymentSuccess from './pages/PaymentSuccess';


// Layout
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function Layout() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/register'];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/orders" element={<RequireAuth><OrderPage /></RequireAuth>} />

        {/* Free Service Routes */}
        <Route path="/services" element={<FreeServices />} />
        <Route path="/services/book/:id" element={<RequireAuth><BookService /></RequireAuth>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/videos" element={<Video />} />
        <Route path="/services/paid" element={<PaidServices />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer/>
    </>
  );
}

// Protect routes for authenticated users
function RequireAuth({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <Router>
      <Layout />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Router>
  );
}

export default App;
