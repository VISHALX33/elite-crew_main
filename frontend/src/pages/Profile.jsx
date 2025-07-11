// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import API from '../axios';

// export default function Profile() {
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     adhar: '',
//     gender: '',
//     dob: '',
//     address: '',
//     about: '',
//     image: '',
//     password: ''
//   });
//   const [preview, setPreview] = useState('');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await API.get('/users/profile', {
//           headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//         });
//         setForm(prev => ({
//           ...prev,
//           name: res.data.name || '',
//           email: res.data.email || '',
//           phone: res.data.phone || '',
//           adhar: res.data.adhar || '',
//           gender: res.data.gender || '',
//           dob: res.data.dob || '',
//           address: res.data.address || '',
//           about: res.data.about || '',
//           image: res.data.image || '',
//           password: ''
//         }));
//         setPreview(res.data.image || '');
//       } catch {
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//     };
//     fetchProfile();
//   }, []);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setForm({ ...form, image: reader.result });
//       setPreview(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };

//   const updateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       await API.put('/users/profile', form, {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       alert('✅ Profile updated!');
//     } catch {
//       alert('❌ Update failed!');
//     }
//   };

//   const deleteAccount = async () => {
//     if (!confirm("Are you sure you want to delete your account?")) return;
//     try {
//       await API.delete('/users/profile', {
//         headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//       });
//       localStorage.removeItem('token');
//       navigate('/login');
//     } catch {
//       alert('❌ Delete failed!');
//     }
//   };

//   export default function ActivityOverview() {
//   const [activity, setActivity] = useState(null);

//   useEffect(() => {
//     API.get('/users/activity', {
//       headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
//     })
//       .then((res) => setActivity(res.data))
//       .catch(() => {});
//   }, []);

//   if (!activity) {
//     return <p className="text-center text-gray-500">Loading activity...</p>;
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
//       <form onSubmit={updateProfile} className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md">
//         <h2 className="text-3xl font-bold text-center text-primary mb-6">My Profile</h2>

//         <div className="flex flex-col items-center">
//           <img
//             src={preview || '/default-avatar.png'}
//             alt="Profile"
//             className="w-24 h-24 rounded-full border object-cover"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="mt-2 text-sm text-gray-600"
//           />
//         </div>

//         <div className="mt-6 space-y-4">
//           <input
//             className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             placeholder="Name"
//             value={form.name}
//             onChange={(e) => setForm({ ...form, name: e.target.value })}
//             required
//           />
//           <input
//             className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed"
//             value={form.email}
//             disabled
//           />
//           <input
//             className="w-full p-3 border rounded-md"
//             placeholder="Phone"
//             value={form.phone}
//             onChange={(e) => setForm({ ...form, phone: e.target.value })}
//           />
//           <input
//             className="w-full p-3 border rounded-md"
//             placeholder="Aadhar"
//             value={form.adhar}
//             onChange={(e) => setForm({ ...form, adhar: e.target.value })}
//           />
//           <select
//             className="w-full p-3 border rounded-md"
//             value={form.gender}
//             onChange={(e) => setForm({ ...form, gender: e.target.value })}
//           >
//             <option value="">Select Gender</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//           <input
//             type="date"
//             className="w-full p-3 border rounded-md"
//             value={form.dob}
//             onChange={(e) => setForm({ ...form, dob: e.target.value })}
//           />
//           <input
//             className="w-full p-3 border rounded-md"
//             placeholder="Address"
//             value={form.address}
//             onChange={(e) => setForm({ ...form, address: e.target.value })}
//           />
//           <textarea
//             className="w-full p-3 border rounded-md"
//             placeholder="About Me"
//             value={form.about}
//             onChange={(e) => setForm({ ...form, about: e.target.value })}
//             rows={3}
//           />
//           <input
//             type="password"
//             className="w-full p-3 border rounded-md"
//             placeholder="New Password (optional)"
//             value={form.password}
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />
//         </div>

//         <div className="mt-6 flex gap-4">
//           <button
//             type="submit"
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
//           >
//             Update Profile
//           </button>
//           <button
//             type="button"
//             onClick={deleteAccount}
//             className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold"
//           >
//             Delete Account
//           </button>
//         </div>
//       </form>
//       <div className="bg-white p-6 rounded-xl shadow-md space-y-4">
//       <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Activity Overview</h2>
//       <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center text-sm font-medium text-gray-700">
//         <div className="bg-blue-100 rounded-xl py-4">
//           ✅ Total Services Booked
//           <div className="text-2xl font-bold text-blue-700">{activity.totalServicesBooked}</div>
//         </div>
//         <div className="bg-green-100 rounded-xl py-4">
//           🛍️ Products Purchased
//           <div className="text-2xl font-bold text-green-700">{activity.totalProductsPurchased}</div>
//         </div>
//         <div className="bg-yellow-100 rounded-xl py-4">
//           ✍️ Reviews Given
//           <div className="text-2xl font-bold text-yellow-700">{activity.reviewsGiven}</div>
//         </div>
//         <div className="bg-purple-100 rounded-xl py-4">
//           📝 Blogs Posted
//           <div className="text-2xl font-bold text-purple-700">{activity.blogsPosted}</div>
//         </div>
//         <div className="bg-pink-100 rounded-xl py-4 col-span-2 sm:col-span-1">
//           💖 Wishlist Items
//           <div className="text-2xl font-bold text-pink-700">{activity.wishlistItems}</div>
//         </div>
//       </div>
//     </div>
//     </div>
//   );
// }
// };
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../axios';

export default function Profile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    adhar: '',
    gender: '',
    dob: '',
    address: '',
    about: '',
    image: '',
    password: ''
  });
  const [preview, setPreview] = useState('');
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profileRes, activityRes] = await Promise.all([
          API.get('/users/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
          API.get('/users/activity', {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          }),
        ]);

        const res = profileRes.data;
        setForm({
          name: res.name || '',
          email: res.email || '',
          phone: res.phone || '',
          adhar: res.adhar || '',
          gender: res.gender || '',
          dob: res.dob || '',
          address: res.address || '',
          about: res.about || '',
          image: res.image || '',
          password: ''
        });
        setPreview(res.image || '');
        setActivity(activityRes.data);
      } catch {
        localStorage.removeItem('token');
        navigate('/login');
      }
    };
    fetchData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      await API.put('/users/profile', form, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('✅ Profile updated!');
    } catch {
      alert('❌ Update failed!');
    }
  };

  const deleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;
    try {
      await API.delete('/users/profile', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      localStorage.removeItem('token');
      navigate('/login');
    } catch {
      alert('❌ Delete failed!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 flex flex-col lg:flex-row gap-6 justify-center items-start">
      {/* Profile Form */}
      <form onSubmit={updateProfile} className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-md">
        <h2 className="text-3xl font-bold text-center text-primary mb-6">My Profile</h2>

        <div className="flex flex-col items-center">
          <img
            src={preview || '/default-avatar.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 text-sm text-gray-600"
          />
        </div>

        <div className="mt-6 space-y-4">
          <input className="w-full p-3 border rounded-md" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input className="w-full p-3 border rounded-md bg-gray-100 cursor-not-allowed" value={form.email} disabled />
          <input className="w-full p-3 border rounded-md" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          <input className="w-full p-3 border rounded-md" placeholder="Aadhar" value={form.adhar} onChange={(e) => setForm({ ...form, adhar: e.target.value })} />
          <select className="w-full p-3 border rounded-md" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="date" className="w-full p-3 border rounded-md" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} />
          <input className="w-full p-3 border rounded-md" placeholder="Address" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          <textarea className="w-full p-3 border rounded-md" placeholder="About Me" value={form.about} onChange={(e) => setForm({ ...form, about: e.target.value })} rows={3} />
          <input type="password" className="w-full p-3 border rounded-md" placeholder="New Password (optional)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        </div>

        <div className="mt-6 flex gap-4">
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">Update Profile</button>
          <button type="button" onClick={deleteAccount} className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md font-semibold">Delete Account</button>
        </div>
      </form>

      {/* Activity Overview */}
      {activity && (
        <div className="bg-white p-6 rounded-xl shadow-md space-y-4 w-full max-w-sm">
          <h2 className="text-xl font-bold text-gray-800 mb-4">📊 Activity Overview</h2>
          <div className="grid grid-cols-3 sm:grid-cols-2 gap-4 text-center text-sm font-medium text-gray-700">
            <div className="bg-blue-100 rounded-xl py-4">
              ✅ Services Booked
              <div className="text-2xl font-bold text-blue-700">{activity.totalServicesBooked}</div>
            </div>
            <div className="bg-green-100 rounded-xl py-4">
              🛍️ Products Purchased
              <div className="text-2xl font-bold text-green-700">{activity.totalProductsPurchased}</div>
            </div>
            <div className="bg-yellow-100 rounded-xl py-4">
              ✍️ Reviews Given
              <div className="text-2xl font-bold text-yellow-700">{activity.reviewsGiven}</div>
            </div>
            <div className="bg-purple-100 rounded-xl py-4">
              📝 Blogs Posted
              <div className="text-2xl font-bold text-purple-700">{activity.blogsPosted}</div>
            </div>
            <div className="bg-pink-100 rounded-xl py-4 col-span-2 sm:col-span-2">
              💖 Wishlist Items
              <div className="text-2xl font-bold text-pink-700">{activity.wishlistItems}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
