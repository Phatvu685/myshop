const { getActiveBanners: modelGetActiveBanners } = require('../model/bannerModel');

async function getBanners() {
    try {
        return await modelGetActiveBanners();
    } catch (error) {
        throw new Error(`Failed to fetch banners: ${error.message}`);
    }
}

module.exports = { getBanners };
