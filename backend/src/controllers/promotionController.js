const { getPromotions } = require('../services/promotionService');

async function getPromotions(req, res) {
    try {
        const promotions = await getPromotions();
        res.json({ success: true, promotions });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getPromotions };