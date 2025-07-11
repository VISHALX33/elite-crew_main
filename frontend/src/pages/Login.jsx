// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../axios';

// export default function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/users/login', { email, password });
//       localStorage.setItem('token', res.data.token);
//       navigate('/'); // redirect to home
//     } catch (err) {
//       const msg = err.response?.data?.message || "Login failed";
//       alert('Login failed: ' + msg);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Login</h2>
//         <input type="email" placeholder="Email" className="w-full mb-3 p-2 border" value={email} onChange={(e) => setEmail(e.target.value)} required />
//         <input type="password" placeholder="Password" className="w-full mb-3 p-2 border" value={password} onChange={(e) => setPassword(e.target.value)} required />
//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Login</button>
//         <p className="text-sm mt-2">Don't have an account? <a href="/register" className="text-blue-500 underline">Register</a></p>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed';
      alert('Login failed: ' + msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-100 to-blue-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">
        
        {/* ✅ Left Banner (hidden on small screens) */}
        <div className="hidden md:block w-1/2 bg-blue-600 text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold mb-4">Welcome Back! 👋</h2>
          <p className="text-sm opacity-90 text-center">
            Log in to access services, products, blogs & more in Elite-Crew.
          </p>
          <img src="/login-banner.svg" alt="Login Banner" className="mt-6 w-4/5" />
        </div>

        {/* ✅ Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Login to Elite-Crew</h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-2 rounded font-medium shadow"
            >
              Login
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Don’t have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline font-medium">
              Register here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
