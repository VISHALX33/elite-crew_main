// import { Home, Briefcase, ClipboardList, User } from 'lucide-react'; // or use @mui/icons-material if you're using Material UI

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white">
//       {/* 💻 Desktop View */}
//       <div className="hidden md:grid grid-cols-4 max-w-6xl mx-auto px-6 py-8 text-sm gap-6">
//         {/* Brand */}
//         <div>
//           <h2 className="text-xl font-bold mb-3">Elite-Crew</h2>
//           <p>Your all-in-one platform for hiring services & shopping products.</p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
//           <ul className="space-y-1">
//             <li><a href="/" className="hover:text-blue-400">Home</a></li>
//             <li><a href="/services" className="hover:text-blue-400">Services</a></li>
//             <li><a href="/orders" className="hover:text-blue-400">My Orders</a></li>
//             <li><a href="/profile" className="hover:text-blue-400">Profile</a></li>
//           </ul>
//         </div>

//         {/* Popular Services */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Popular Services</h3>
//           <ul className="space-y-1">
//             <li>Babysitter</li>
//             <li>Dog Walker</li>
//             <li>Personal Chef</li>
//             <li>Tutor</li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
//           <p>Email: support@elitecrew.com</p>
//           <p>Phone: +91 98765 43210</p>
//           <p>Location: India</p>
//         </div>
//       </div>
//  <br />
//       <br />
      
//       {/* 📱 Mobile Footer Navigation */}
//       <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around items-center py-2 border-t border-gray-700 z-50">
//         <a href="/" className="flex flex-col items-center text-xs">
//           <Home size={20} />
//           <span>Home</span>
//         </a>
//         <a href="/services" className="flex flex-col items-center text-xs">
//           <Briefcase size={20} />
//           <span>Services</span>
//         </a>
//         <a href="/orders" className="flex flex-col items-center text-xs">
//           <ClipboardList size={20} />
//           <span>Orders</span>
//         </a>
//         <a href="/profile" className="flex flex-col items-center text-xs">
//           <User size={20} />
//           <span>Profile</span>
//         </a>
//       </div>

//       {/* Bottom Bar (for both) */}
//       <div className="hidden md:block border-t border-gray-700 text-center text-xs text-gray-400 py-3">
//         © {new Date().getFullYear()} Elite-Crew. All rights reserved.
//       </div>
//     </footer>
//   );
// }

import { Home, Briefcase, ClipboardList, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* 💻 Desktop Footer */}
      <div className="hidden md:grid grid-cols-4 max-w-6xl mx-auto px-6 py-10 text-sm gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-blue-400">Elite-Crew</h2>
          <p className="text-gray-300">
            Your all-in-one platform for hiring services & shopping products.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-300">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-white transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-white transition">Services</Link></li>
            <li><Link to="/orders" className="hover:text-white transition">My Orders</Link></li>
            <li><Link to="/profile" className="hover:text-white transition">Profile</Link></li>
          </ul>
        </div>

        {/* Popular Services */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-300">Popular Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li>Babysitter</li>
            <li>Dog Walker</li>
            <li>Personal Chef</li>
            <li>Tutor</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-blue-300">Contact Us</h3>
          <p className="text-gray-400">Email: support@elitecrew.com</p>
          <p className="text-gray-400">Phone: +91 98765 43210</p>
          <p className="text-gray-400">Location: India</p>
        </div>
      </div>
      <br />
      <br />

      {/* 📱 Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 text-white flex justify-around items-center py-2 border-t border-gray-700 z-50">
        <Link to="/" className="flex flex-col items-center text-xs hover:text-blue-400 transition">
          <Home size={20} />
          <span>Home</span>
        </Link>
        <Link to="/services" className="flex flex-col items-center text-xs hover:text-blue-400 transition">
          <Briefcase size={20} />
          <span>Services</span>
        </Link>
        <Link to="/orders" className="flex flex-col items-center text-xs hover:text-blue-400 transition">
          <ClipboardList size={20} />
          <span>Orders</span>
        </Link>
        <Link to="/profile" className="flex flex-col items-center text-xs hover:text-blue-400 transition">
          <User size={20} />
          <span>Profile</span>
        </Link>
      </div>

      {/* Bottom Bar (for desktop) */}
      <div className="hidden md:block border-t border-gray-800 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} Elite-Crew. All rights reserved.
      </div>
    </footer>
  );
}
