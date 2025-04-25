const { connection } = require('../../config/db');

async function getActiveBanners() {
    try {
        const conn = await connection();
        const [banners] = await conn.query('SELECT * FROM banners WHERE is_active = ?', [true]);
        await conn.end();
        return banners;
    } catch (error) {
        throw new Error(`Failed to fetch banners: ${error.message}`);
    }
}

module.exports = { getActiveBanners };