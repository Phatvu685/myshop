const express = require('express');
const router = express.Router();
const { getCart, addCartItem, updateCartItem, deleteCartItem } = require('../controllers/cartController');
const { verifyToken } = require('../middleware/authMiddleware');

router.get('/', verifyToken, getCart);
router.post('/', verifyToken, addCartItem);
router.put('/:cart_item_id', verifyToken, updateCartItem);
router.delete('/:cart_item_id', verifyToken, deleteCartItem);

module.exports = router;