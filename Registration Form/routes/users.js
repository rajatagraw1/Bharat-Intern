const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Handle POST request for user registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the username or email already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }

        // Create a new user
        const newUser = new User({ username, email, password });

        // Save the user to the database
        await newUser.save();

        // Send a success response
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;