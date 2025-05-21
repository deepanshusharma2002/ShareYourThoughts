const express = require('express');
const multer = require('multer');
const Blog = require('../models/Blog');
const path = require('path');

const router = express.Router();

// Image upload config
const storage = multer.diskStorage({
  destination: './uploads/blogs',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Create
router.post('/', upload.single('image'), async (req, res) => {
  const { title, description, fullContent } = req.body;
  const blog = new Blog({
    title,
    description,
    fullContent,
    image: req.file ? 'uploads/blogs/' + req.file.filename : ''
  });
  await blog.save();
  res.json(blog);
});

// Read all
router.get('/', async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// Read single
router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.json(blog);
});

// Update
router.put('/:id', upload.single('image'), async (req, res) => {
  const { title, description, fullContent } = req.body;
  const updatedData = {
    title,
    description,
    fullContent
  };
  if (req.file) {
    updatedData.image = 'uploads/blogs/' + req.file.filename;
  }
  const blog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  res.json(blog);
});

// Delete
router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted successfully' });
});

module.exports = router;
