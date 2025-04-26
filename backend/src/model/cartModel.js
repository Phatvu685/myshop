const pool = require('../../config/db');

async function getCartByUserId(user_id) {
    try {
        const conn = await pool.getConnection();
        const [carts] = await conn.query(
            `
            SELECT c.cart_id, ci.cart_item_id, ci.product_id, ci.quantity, p.name, p.price, p.discount_price
            FROM cart c
            LEFT JOIN cart_items ci ON c.cart_id = ci.cart_id
            LEFT JOIN products p ON ci.product_id = p.product_id
            WHERE c.user_id = ?
            `,
            [user_id]
        );
        conn.release();
        return carts;
    } catch (error) {
        throw new Error(`Failed to fetch cart: ${error.message}`);
    }
}

async function addCartItem({ cart_id, product_id, quantity }) {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)',
            [cart_id, product_id, quantity]
        );
        conn.release();
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to add cart item: ${error.message}`);
    }
}

async function updateCartItem(cart_item_id, quantity) {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            'UPDATE cart_items SET quantity = ? WHERE cart_item_id = ?',
            [quantity, cart_item_id]
        );
        conn.release();
        return result.affectedRows;
    } catch (error) {
        throw new Error(`Failed to update cart item: ${error.message}`);
    }
}

async function deleteCartItem(cart_item_id) {
    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            'DELETE FROM cart_items WHERE cart_item_id = ?',
            [cart_item_id]
        );
        conn.release();
        return result.affectedRows;
    } catch (error) {
        throw new Error(`Failed to delete cart item: ${error.message}`);
    }
}

async function getOrCreateCart(user_id) {
    try {
        const conn = await pool.getConnection();
        const [carts] = await conn.query('SELECT cart_id FROM cart WHERE user_id = ?', [user_id]);
        if (carts[0]) {
            conn.release();
            return carts[0].cart_id;
        }

        const [result] = await conn.query('INSERT INTO cart (user_id) VALUES (?)', [user_id]);
        conn.release();
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to get or create cart: ${error.message}`);
    }
}

module.exports = { getCartByUserId, addCartItem, updateCartItem, deleteCartItem, getOrCreateCart };
