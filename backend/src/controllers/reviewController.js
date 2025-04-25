const { createReview, getReviews } = require('../services/reviewService');

async function createReview(req, res) {
    try {
        const { product_id, rating, comment } = req.body;
        const reviewId = await createReview({
            product_id,
            user_id: req.user.user_id,
            rating,
            comment,
        });
        res.status(201).json({ success: true, message: 'Review created', reviewId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function getReviews(req, res) {
    try {
        const reviews = await getReviews(req.params.product_id);
        res.json({ success: true, reviews });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { createReview, getReviews };