const jwt = require('jsonwebtoken');
require('dotenv').config();

async function verifyToken(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

async function verifyAdmin(req, res, next) {
    try {
        if (req.user.role !== 'admin') throw new Error('Admin access required');
        next();
    } catch (error) {
        res.status(403).json({ success: false, message: error.message });
    }
}

module.exports = { verifyToken, verifyAdmin };