const { connection } = require('../../config/db');

async function createReview({ product_id, user_id, rating, comment }) {
    try {
        const conn = await connection();
        const [result] = await conn.query(
            'INSERT INTO reviews (product_id, user_id, rating, comment) VALUES (?, ?, ?, ?)',
            [product_id, user_id, rating, comment]
        );
        await conn.end();
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to create review: ${error.message}`);
    }
}

async function getReviewsByProductId(product_id) {
    try {
        const conn = await connection();
        const [reviews] = await conn.query(
            `
            SELECT r.*, u.username
            FROM reviews r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.product_id = ?
            `,
            [product_id]
        );
        await conn.end();
        return reviews;
    } catch (error) {
        throw new Error(`Failed to fetch reviews: ${error.message}`);
    }
}

module.exports = { createReview, getReviewsByProductId };