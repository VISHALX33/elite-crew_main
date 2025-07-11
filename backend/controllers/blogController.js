import Blog from '../models/blog.js';

export const createBlog = async (req, res) => {
  const { title, content, image } = req.body;
  const blog = await Blog.create({
    title,
    content,
    image,
    createdBy: req.user._id
  });
  res.status(201).json(blog);
};

export const getAllBlogs = async (req, res) => {
  const blogs = await Blog.find().populate('createdBy', 'name').sort({ createdAt: -1 });
  res.json(blogs);
};

export const getBlogById = async (req, res) => {
  const blog = await Blog.findById(req.params.id)
    .populate('createdBy', 'name')
    .populate('comments.user', 'name');
  if (!blog) return res.status(404).json({ message: 'Blog not found' });
  res.json(blog);
};

export const likeBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  const liked = blog.likes.includes(req.user._id);
  if (liked) {
    blog.likes.pull(req.user._id);
  } else {
    blog.likes.push(req.user._id);
  }
  await blog.save();
  res.json({ liked: !liked });
};

export const commentBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  blog.comments.push({ user: req.user._id, text: req.body.text });
  await blog.save();
  res.status(201).json({ message: 'Comment added' });
};

export const deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ message: 'Blog not found' });

  if (blog.createdBy.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: 'Unauthorized' });
  }

  await blog.remove();
  res.json({ message: 'Blog deleted' });
};
