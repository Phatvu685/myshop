const { getProducts: serviceGetProducts, getProductById: serviceGetProductById, addProduct: serviceAddProduct, updateProduct: serviceUpdateProduct, deleteProduct: serviceDeleteProduct } = require('../services/productService');

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

async function addProduct(req, res) {
    try {
        const data = req.body;
        const requiredFields = ['name', 'category_id', 'brand_id', 'price', 'description'];
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
        }
        data.created_at = new Date();
        const insertId = await serviceAddProduct(data);
        res.status(201).json({ success: true, productId: insertId });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function updateProduct(req, res) {
    try {
        const id = req.params.id;
        const data = req.body;
        const requiredFields = ['name', 'category_id', 'brand_id', 'price', 'description'];
        const missingFields = requiredFields.filter(field => !data[field]);
        if (missingFields.length > 0) {
            return res.status(400).json({ success: false, message: `Missing required fields: ${missingFields.join(', ')}` });
        }
        const success = await serviceUpdateProduct(id, data);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Product not found or not updated' });
        }
        res.json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function deleteProduct(req, res) {
    try {
        const id = req.params.id;
        const success = await serviceDeleteProduct(id);
        if (!success) {
            return res.status(404).json({ success: false, message: 'Product not found or not deleted' });
        }
        res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
