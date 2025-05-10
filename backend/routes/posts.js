const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Post = require('../models/Post');
const router = express.Router();

const uploadsDir = 'uploads';
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// POST: Create Post
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token' });

    const decoded = jwt.verify(token, 'secret');

    const post = new Post({
      userId: decoded.id,
      caption: req.body.caption,
      image: req.file?.path, // image path saved
    });

    await post.save();
    res.json({ message: 'Post created' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ GET: Fetch all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    const baseUrl = req.protocol + '://' + req.get('host');

    const postsWithUrls = posts.map(post => ({
      caption: post.caption,
      imageUrl: `${baseUrl}/uploads/${encodeURIComponent(path.basename(post.image))}`,
    }));

    res.json(postsWithUrls);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

module.exports = router;
