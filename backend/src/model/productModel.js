const db = require('../../config/db');

async function getProducts({ category_id, brand_id, min_price, max_price, sort_by, page, limit, search }) {
    try {
        const offset = (page - 1) * limit;
        let query = `
            SELECT p.*, c.name AS category_name, b.name AS brand_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            LEFT JOIN brands b ON p.brand_id = b.brand_id
            WHERE 1=1
        `;
        const params = [];

        if (category_id) {
            query += ' AND p.category_id = ?';
            params.push(category_id);
        }
        if (brand_id) {
            query += ' AND p.brand_id = ?';
            params.push(brand_id);
        }
        if (min_price) {
            query += ' AND p.price >= ?';
            params.push(min_price);
        }
        if (max_price) {
            query += ' AND p.price <= ?';
            params.push(max_price);
        }
        if (search) {
            query += ' AND (p.name LIKE ? OR p.description LIKE ?)';
            params.push(`%${search}%`, `%${search}%`);
        }

        if (sort_by === 'price_asc') query += ' ORDER BY p.price ASC';
        else if (sort_by === 'price_desc') query += ' ORDER BY p.price DESC';
        else if (sort_by === 'newest') query += ' ORDER BY p.created_at DESC';

        query += ' LIMIT ? OFFSET ?';
        params.push(parseInt(limit), parseInt(offset));

        const [products] = await db.query(query, params);
        return products;
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
}

async function getProductById(id) {
    try {
        const [products] = await db.query(
            `
            SELECT p.*, c.name AS category_name, b.name AS brand_name
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.category_id
            LEFT JOIN brands b ON p.brand_id = b.brand_id
            WHERE p.product_id = ?
            `,
            [id]
        );
        if (!products[0]) {
            return null;
        }

        const [images] = await db.query('SELECT * FROM product_images WHERE product_id = ?', [id]);
        const [specs] = await db.query('SELECT * FROM product_specifications WHERE product_id = ?', [id]);
        const [reviews] = await db.query(
            `
            SELECT r.*, u.username
            FROM reviews r
            JOIN users u ON r.user_id = u.user_id
            WHERE r.product_id = ?
            `,
            [id]
        );

        return { ...products[0], images, specifications: specs, reviews };
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
    }
}

async function addProduct({ name, category_id, brand_id, price, description, created_at }) {
    try {
        const [result] = await db.query(
            `INSERT INTO products (name, category_id, brand_id, price, description, created_at)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [name, category_id, brand_id, price, description, created_at]
        );
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to add product: ${error.message}`);
    }
}

async function updateProduct(id, { name, category_id, brand_id, price, description }) {
    try {
        const [result] = await db.query(
            `UPDATE products SET name = ?, category_id = ?, brand_id = ?, price = ?, description = ? WHERE product_id = ?`,
            [name, category_id, brand_id, price, description, id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Failed to update product: ${error.message}`);
    }
}

async function deleteProduct(id) {
    try {
        const [result] = await db.query(
            `DELETE FROM products WHERE product_id = ?`,
            [id]
        );
        return result.affectedRows > 0;
    } catch (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
    }
}

module.exports = { getProducts, getProductById, addProduct, updateProduct, deleteProduct };
