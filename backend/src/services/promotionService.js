const { getActivePromotions: modelGetActivePromotions } = require('../model/promotionModel');

async function getPromotions() {
    try {
        return await modelGetActivePromotions();
    } catch (error) {
        throw new Error(`Failed to fetch promotions: ${error.message}`);
    }
}

module.exports = { getPromotions };
