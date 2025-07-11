// import { useNavigate, Link } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { FaUser, FaSignOutAlt, FaShoppingCart, FaWallet, FaBars, FaTimes } from 'react-icons/fa';
// import API from '../axios';

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [user, setUser] = useState(null);
//   const [showMenu, setShowMenu] = useState(false);
//   const [mobileMenu, setMobileMenu] = useState(false);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await API.get('/users/profile', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setUser(res.data);
//       } catch {
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     };
//     fetchUser();
//   }, [navigate]);

//   const logout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return (
//     <nav className="bg-white shadow p-4 flex justify-between items-center relative">
//       <h1
//         onClick={() => navigate('/')}
//         className="text-xl font-bold cursor-pointer text-blue-600"
//       >
//         Elite-Crew
//       </h1>

//       {/* Desktop View */}
//       <div className="hidden md:flex items-center gap-6">
//         {user && (
//           <>
//             <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
//               ₹{user.wallet?.toLocaleString() || 0}
//             </span>
//             <Link
//               to="/orders"
//               className="text-sm font-medium text-blue-600 hover:underline"
//             >
//               Orders
//             </Link>

//             {/* Profile Image */}
//             <img
//               onClick={() => setShowMenu(!showMenu)}
//               src={
//                 user.image ||
//                 `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
//               }
//               alt="Profile"
//               className="w-10 h-10 rounded-full object-cover cursor-pointer border border-gray-300"
//             />

//             {/* Dropdown */}
//             {showMenu && (
//               <div className="absolute right-4 top-16 bg-white border rounded shadow w-40 z-20">
//                 <button
//                   onClick={() => {
//                     setShowMenu(false);
//                     navigate('/profile');
//                   }}
//                   className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
//                 >
//                   <FaUser /> Profile
//                 </button>
//                 <button
//                   onClick={logout}
//                   className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
//                 >
//                   <FaSignOutAlt /> Logout
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Mobile Menu Icon */}
//       <div className="md:hidden">
//         <button onClick={() => setMobileMenu(!mobileMenu)}>
//           {mobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {mobileMenu && user && (
//         <div className="absolute top-full left-0 w-full bg-white shadow-md p-4 z-20 flex flex-col gap-4">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center gap-2">
//               <FaWallet className="text-green-600" />
//               <span className="font-semibold text-green-600">
//                 ₹{user.wallet?.toLocaleString() || 0}
//               </span>
//             </div>
//             <img
//               src={
//                 user.image ||
//                 `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
//               }
//               alt="User"
//               className="w-8 h-8 rounded-full object-cover"
//             />
//           </div>

//           <Link
//             to="/orders"
//             onClick={() => setMobileMenu(false)}
//             className="flex items-center gap-2 text-blue-600"
//           >
//             <FaShoppingCart /> Orders
//           </Link>

//           <button
//             onClick={() => {
//               setMobileMenu(false);
//               navigate('/profile');
//             }}
//             className="flex items-center gap-2"
//           >
//             <FaUser /> Profile
//           </button>

//           <button
//             onClick={logout}
//             className="flex items-center gap-2 text-red-600"
//           >
//             <FaSignOutAlt /> Logout
//           </button>
//         </div>
//       )}
//     </nav>
//   );
// }

import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaUser, FaSignOutAlt, FaShoppingCart, FaWallet, FaBars, FaTimes } from 'react-icons/fa';
import API from '../axios';

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/users/profile', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUser(res.data);
      } catch {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchUser();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm p-4 flex justify-between items-center relative z-50">
      {/* Logo */}
      <h1
        onClick={() => navigate('/')}
        className="text-xl md:text-2xl font-bold cursor-pointer text-blue-600"
      >
        Elite-Crew
      </h1>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {user && (
          <>
            <span className="text-sm font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full shadow-inner">
              ₹{user.wallet?.toLocaleString() || 0}
            </span>
            <Link to="/orders" className="text-sm font-medium text-blue-600 hover:underline">
              Orders
            </Link>

            {/* Profile Image */}
            <div className="relative">
              <img
                onClick={() => setShowMenu(!showMenu)}
                src={
                  user.image ||
                  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
                }
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-blue-200 hover:border-blue-400 transition"
              />

              {/* Dropdown */}
              {showMenu && (
                <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40">
                  <button
                    onClick={() => {
                      setShowMenu(false);
                      navigate('/profile');
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100"
                  >
                    <FaUser /> Profile
                  </button>
                  <button
                    onClick={logout}
                    className="w-full flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile Toggle Icon */}
      <div className="md:hidden">
        <button onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <FaTimes size={22} /> : <FaBars size={22} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenu && user && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg p-4 z-40 flex flex-col gap-4 md:hidden">
          {/* User Wallet + Avatar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaWallet className="text-green-600" />
              <span className="font-semibold text-green-600">
                ₹{user.wallet?.toLocaleString() || 0}
              </span>
            </div>
            <img
              src={
                user.image ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`
              }
              alt="User"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
          </div>

          {/* Links */}
          <Link
            to="/orders"
            onClick={() => setMobileMenu(false)}
            className="flex items-center gap-2 text-blue-600 font-medium"
          >
            <FaShoppingCart /> Orders
          </Link>
          <button
            onClick={() => {
              setMobileMenu(false);
              navigate('/profile');
            }}
            className="flex items-center gap-2 font-medium"
          >
            <FaUser /> Profile
          </button>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-600 font-medium"
          >
            <FaSignOutAlt /> Logout
          </button>
        </div>
      )}
    </nav>
  );
}
