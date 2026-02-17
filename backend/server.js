require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Body parser

// Routes (Placeholders for now)
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const headerRoutes = require('./routes/headerRoutes');
const orderRoutes = require('./routes/orderRoutes');
const collectionRoutes = require('./routes/collectionRoutes');

// Mount Routes
app.use('/api/admin/products', adminRoutes);
app.use('/api/user/products', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/admin/header', headerRoutes);
app.use('/api/admin/orders', orderRoutes);
app.use('/api/admin/collections', collectionRoutes);
app.use('/api/collections', collectionRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
