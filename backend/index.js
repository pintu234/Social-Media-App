// 📁 server.js (Entry Point)
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));

/*
Usage:
1. Register: POST /api/auth/register
2. Login: POST /api/auth/login
3. Create Post: POST /api/posts
*/
