const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://rajatagrawal31586:rajatagrawal1234@cluster0.qt3s1fw.mongodb.net/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (HTML, CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const userRoutes = require('./routes/users');
app.use('/users', userRoutes);

// Server listening
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});