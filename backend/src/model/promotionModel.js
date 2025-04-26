const db = require('../../config/db');

async function getActivePromotions() {
    try {
        const [promotions] = await db.query(
            'SELECT * FROM promotions WHERE is_active = ? AND start_date <= NOW() AND end_date >= NOW()',
            [true]
        );
        return promotions;
    } catch (error) {
        throw new Error(`Failed to fetch promotions: ${error.message}`);
    }
}

module.exports = { getActivePromotions };
