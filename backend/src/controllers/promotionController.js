const { getPromotions: serviceGetPromotions } = require('../services/promotionService');

async function getPromotions(req, res) {
    try {
        const promotions = await serviceGetPromotions();
        res.json({ success: true, promotions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getPromotions };
