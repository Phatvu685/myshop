const { getBanners: serviceGetBanners } = require('../services/bannerService');

async function getBanners(req, res) {
    try {
        const banners = await serviceGetBanners();
        res.json({ success: true, banners });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getBanners };
