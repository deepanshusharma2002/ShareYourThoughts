const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const connectDB = require('./db.js');
const path = require('path');

const app = express();
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
connectDB();
app.use(cors());
app.use(express.json());
// app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/blogs', require('./routes/blog'));

app.listen(5000, () => console.log('Server running on port 5000'));
