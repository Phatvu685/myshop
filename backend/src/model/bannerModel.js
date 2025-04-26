const db = require('../../config/db');

async function getActiveBanners() {
    try {
        const [banners] = await db.query('SELECT * FROM banners WHERE is_active = ?', [true]);
        return banners;
    } catch (error) {
        throw new Error(`Failed to fetch banners: ${error.message}`);
    }
}

module.exports = { getActiveBanners };
