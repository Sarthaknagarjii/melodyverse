const express = require('express');
const Post = require('../models/Post1');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Get paginated posts
router.get('/', authMiddleware, async (req, res) => {
  // Ensure user is authenticated
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Pagination parameters
  const page = parseInt(req.query.page) || 1;
  const limit = 10; // Adjust the limit as per your requirement
  const skip = (page - 1) * limit;

  try {
    // Fetch posts data
    const posts = await Post.find().skip(skip).limit(limit);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
