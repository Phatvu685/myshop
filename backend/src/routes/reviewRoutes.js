const express = require('express');
const router = express.Router();
const { createReview, getReviews } = require('../controllers/reviewController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/', verifyToken, createReview);
router.get('/:product_id', getReviews);

module.exports = router;