const { getActiveBanners } = require('../models/bannerModel');

async function getBanners() {
    try {
        return await getActiveBanners();
    } catch (error) {
        throw new Error(`Failed to fetch banners: ${error.message}`);
    }
}

module.exports = { getBanners };