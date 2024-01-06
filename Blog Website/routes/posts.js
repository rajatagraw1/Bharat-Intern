const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Handle POST request to create a new post
router.post('/', async (req, res) => {
    try {
        // Assuming your request body contains 'title' and 'content'
        const { title, content } = req.body;

        // Create a new post
        const newPost = new Post({ title, content });

        // Save the post to the database
        await newPost.save();

        // Send a success response
        res.status(201).json({ message: 'Post created successfully' });
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: 'desc' }); // Fetch posts in descending order of creation time
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Add more routes for fetching posts, updating, deleting, etc.

module.exports = router;