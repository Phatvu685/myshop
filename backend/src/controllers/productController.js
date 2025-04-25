const { getProducts: serviceGetProducts, getProductById: serviceGetProductById } = require('../services/productService');

async function getProducts(req, res) {
    try {
        const products = await serviceGetProducts(req.query);
        res.json({ success: true, products });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getProductById(req, res) {
    try {
        const product = await serviceGetProductById(req.params.id);
        res.json({ success: true, product });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

module.exports = { getProducts, getProductById };
