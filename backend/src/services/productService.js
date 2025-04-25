const { getProducts, getProductById } = require('../models/productModel');

async function getProducts(filters) {
    try {
        return await getProducts(filters);
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
}

async function getProductById(id) {
    try {
        const product = await getProductById(id);
        if (!product) throw new Error('Product not found');
        return product;
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
    }
}

module.exports = { getProducts, getProductById };