
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const bannerRoutes = require('./routes/bannerRoutes');
const promotionRoutes = require('./routes/promotionRoutes');
const staticPageRoutes = require('./routes/staticPageRoutes');
require('dotenv').config();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to check for missing request body on POST, PUT, PATCH
app.use((req, res, next) => {
    if (['POST', 'PUT', 'PATCH'].includes(req.method) && (req.body === undefined || Object.keys(req.body).length === 0)) {
        return res.status(400).json({ success: false, message: 'Request body is missing' });
    }
    next();
});

// Middleware to log incoming request bodies for debugging
app.use((req, res, next) => {
    console.log(`Incoming ${req.method} request to ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/banners', bannerRoutes);
app.use('/api/promotions', promotionRoutes);
app.use('/api/static-pages', staticPageRoutes);

const PORT = process.env.PORT || 5000;


const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

console.log('DB_CONFIG:', dbConfig);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
