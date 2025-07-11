// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../axios';

// export default function Register() {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const navigate = useNavigate();

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await API.post('/users/register', form);
//       localStorage.setItem('token', res.data.token);
//       navigate('/'); // redirect to home
//     } catch (err) {
//       const msg = err.response?.data?.message || "Registration failed";
//       alert('Registration failed: ' + msg);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
//       <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-4">Register</h2>
//         <input type="text" placeholder="Name" className="w-full mb-3 p-2 border" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
//         <input type="email" placeholder="Email" className="w-full mb-3 p-2 border" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
//         <input type="password" placeholder="Password" className="w-full mb-3 p-2 border" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
//         <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Register</button>
//         <p className="text-sm mt-2">Already have an account? <a href="/login" className="text-blue-500 underline">Login</a></p>
//       </form>
//     </div>
//   );
// }

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/users/register', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      alert('Registration failed: ' + msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-100 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl overflow-hidden flex flex-col md:flex-row animate-fadeIn">
        
        {/* ✅ Left Banner (hidden on small screens) */}
        <div className="hidden md:block w-1/2 bg-green-600 text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-3xl font-bold mb-4">Join Elite-Crew 🚀</h2>
          <p className="text-sm opacity-90 text-center">
            Register and unlock services, blogs, and exclusive product deals.
          </p>
          <img src="/register-banner.svg" alt="Register Banner" className="mt-6 w-4/5" />
        </div>

        {/* ✅ Right Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Create Your Account</h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 transition text-white py-2 rounded font-medium shadow"
            >
              Register
            </button>
          </form>

          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline font-medium">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
