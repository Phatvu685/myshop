const { getActivePromotions } = require('../models/promotionModel');

async function getPromotions() {
    try {
        return await getActivePromotions();
    } catch (error) {
        throw new Error(`Failed to fetch promotions: ${error.message}`);
    }
}

module.exports = { getPromotions };