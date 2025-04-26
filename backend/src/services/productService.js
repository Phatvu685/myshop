const { getProducts: modelGetProducts, getProductById: modelGetProductById, addProduct: modelAddProduct, updateProduct: modelUpdateProduct, deleteProduct: modelDeleteProduct } = require('../model/productModel');

async function getProducts(filters) {
    try {
        return await modelGetProducts(filters);
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
}

async function getProductById(id) {
    try {
        const product = await modelGetProductById(id);
        if (!product) throw new Error('Product not found');
        return product;
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
    }
}

async function addProduct(data) {
    try {
        const insertId = await modelAddProduct(data);
        return insertId;
    } catch (error) {
        throw new Error(`Failed to add product: ${error.message}`);
    }
}

async function updateProduct(id, data) {
    try {
        const success = await modelUpdateProduct(id, data);
        if (!success) throw new Error('Product not found or not updated');
        return success;
    } catch (error) {
        throw new Error(`Failed to update product: ${error.message}`);
    }
}

async function deleteProduct(id) {
    try {
        const success = await modelDeleteProduct(id);
        if (!success) throw new Error('Product not found or not deleted');
        return success;
    } catch (error) {
        if (error.message.includes('foreign key constraint fails')) {
            throw new Error('Cannot delete product because it is referenced by other records (e.g., cart items)');
        }
        throw new Error(`Failed to delete product: ${error.message}`);
    }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
