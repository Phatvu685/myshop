const { getProducts, getProductById } = require('../services/productService');

async function getProducts(req, res) {
    try {
        const products = await getProducts(req.query);
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getProductById(req, res) {
    try {
        const product = await getProductById(req.params.id);
        res.json({ success: true, product });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

module.exports = { getProducts, getProductById };