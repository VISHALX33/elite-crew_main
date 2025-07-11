// import { useNavigate } from 'react-router-dom';

// export default function Video() {
//   const navigate = useNavigate();

//   const videos = [
//     'https://youtu.be/v1ftuJIJjTw?si=2RIJSEgdoG3_exdn',
//     'https://www.youtube.com/embed/3JZ_D3ELwOQ',
//     'https://www.youtube.com/embed/ysz5S6PUM-U',
//     'https://www.youtube.com/embed/tgbNymZ7vqY',
//     'https://www.youtube.com/embed/M7lc1UVf-VE',
//     'https://www.youtube.com/embed/E7wJTI-1dvQ',
//     'https://www.youtube.com/embed/fLexgOxsZu0',
//     'https://www.youtube.com/embed/V-_O7nl0Ii0',
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-4">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">All Videos 📹</h1>
//         <button
//           onClick={() => navigate('/')}
//           className="text-sm text-blue-600 hover:underline"
//         >
//           ⬅ Back to Home
//         </button>
//       </div>

//       <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {videos.map((url, index) => (
//           <div key={index} className="aspect-video w-full rounded overflow-hidden shadow border">
//             <iframe
//               src={url}
//               title={`YouTube video ${index + 1}`}
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//               className="w-full h-full"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useNavigate } from 'react-router-dom';

export default function Video() {
  const navigate = useNavigate();

  const videos = [
    'https://www.youtube.com/embed/v1ftuJIJjTw',
    'https://www.youtube.com/embed/3JZ_D3ELwOQ',
    'https://www.youtube.com/embed/ysz5S6PUM-U',
    'https://www.youtube.com/embed/tgbNymZ7vqY',
    'https://www.youtube.com/embed/M7lc1UVf-VE',
    'https://www.youtube.com/embed/E7wJTI-1dvQ',
    'https://www.youtube.com/embed/fLexgOxsZu0',
    'https://www.youtube.com/embed/V-_O7nl0Ii0',
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">🎥 All Videos</h1>
          <button
            onClick={() => navigate('/')}
            className="text-sm text-blue-600 hover:underline"
          >
            ⬅ Back to Home
          </button>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((url, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition border bg-white"
            >
              <iframe
                src={url}
                title={`YouTube video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-60"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
