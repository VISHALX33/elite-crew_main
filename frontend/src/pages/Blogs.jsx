
import { useEffect, useState } from 'react';
import API from '../axios';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '' });
  const [commentText, setCommentText] = useState({}); // blogId => comment

  const fetchBlogs = async () => {
    const res = await API.get('/blogs');
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleCreateBlog = async (e) => {
    e.preventDefault();
    try {
      await API.post('/blogs', newBlog);
      setNewBlog({ title: '', content: '' });
      fetchBlogs();
    } catch {
      alert('Failed to post blog');
    }
  };

  const toggleLike = async (id) => {
    await API.post(`/blogs/${id}/like`);
    fetchBlogs();
  };

  const submitComment = async (id) => {
    if (!commentText[id]) return;
    await API.post(`/blogs/${id}/comment`, { text: commentText[id] });
    setCommentText({ ...commentText, [id]: '' });
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">📝 Blog Space</h1>

        {/* Create Blog */}
        <form
          onSubmit={handleCreateBlog}
          className="bg-white p-5 shadow-md rounded-xl space-y-4 mb-10"
        >
          <h2 className="text-xl font-semibold text-gray-700">Create a new blog</h2>
          <input
            type="text"
            placeholder="Blog Title"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newBlog.title}
            onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
            required
          />
          <textarea
            placeholder="What's on your mind?"
            className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            value={newBlog.content}
            onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Post Blog
          </button>
        </form>

        {/* Blog List */}
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs available yet.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="bg-white p-5 rounded-xl shadow mb-6">
              <h2 className="font-bold text-xl text-gray-800">{blog.title}</h2>
              <p className="text-gray-700 mt-1">{blog.content}</p>
              <div className="text-sm text-gray-500 mt-2">
                By <span className="font-medium">{blog.createdBy?.name || 'Unknown'}</span>
              </div>

              {/* Like & Comments Summary */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => toggleLike(blog._id)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  👍 {blog.likes?.length || 0} Like{blog.likes?.length === 1 ? '' : 's'}
                </button>
                <span className="text-sm text-gray-600">
                  💬 {blog.comments?.length || 0} Comment{blog.comments?.length === 1 ? '' : 's'}
                </span>
              </div>

              {/* Add Comment */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  placeholder="Write a comment..."
                  value={commentText[blog._id] || ''}
                  onChange={(e) =>
                    setCommentText({ ...commentText, [blog._id]: e.target.value })
                  }
                  className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button
                  onClick={() => submitComment(blog._id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                  Send
                </button>
              </div>

              {/* Display Comments */}
              {blog.comments?.length > 0 && (
                <div className="mt-4 space-y-2">
                  {blog.comments.map((c, i) => (
                    <div key={i} className="bg-gray-100 p-2 rounded text-sm">
                      <span className="font-medium">{c.user?.name || 'User'}:</span>{' '}
                      {c.text}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
