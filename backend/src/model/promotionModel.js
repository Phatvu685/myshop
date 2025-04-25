const { connection } = require('../../config/db');

async function getActivePromotions() {
    try {
        const conn = await connection();
        const [promotions] = await conn.query(
            'SELECT * FROM promotions WHERE is_active = ? AND start_date <= NOW() AND end_date >= NOW()',
            [true]
        );
        await conn.end();
        return promotions;
    } catch (error) {
        throw new Error(`Failed to fetch promotions: ${error.message}`);
    }
}

module.exports = { getActivePromotions };