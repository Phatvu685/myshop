const express = require('express');
const router = express.Router();
const { createOrder, getOrders, getOrder, updateOrderStatus } = require('../controllers/orderController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware');

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);
router.get('/:id', verifyToken, getOrder);
router.put('/:id', verifyToken, verifyAdmin, updateOrderStatus);

module.exports = router;