const { createReview, getReviewsByProductId } = require('../models/reviewModel');

async function createReview({ product_id, user_id, rating, comment }) {
    try {
        return await createReview({ product_id, user_id, rating, comment });
    } catch (error) {
        throw new Error(`Failed to create review: ${error.message}`);
    }
}

async function getReviews(product_id) {
    try {
        return await getReviewsByProductId(product_id);
    } catch (error) {
        throw new Error(`Failed to fetch reviews: ${error.message}`);
    }
}

module.exports = { createReview, getReviews };