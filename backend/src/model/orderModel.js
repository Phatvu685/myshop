const { connection } = require('../../config/db');

async function createOrder({ user_id, total_amount, shipping_fee, shipping_address, recipient_name, recipient_phone, payment_method }) {
    try {
        const conn = await connection();
        const [result] = await conn.query(
            'INSERT INTO orders (user_id, total_amount, shipping_fee, shipping_address, recipient_name, recipient_phone, payment_method) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [user_id, total_amount, shipping_fee, shipping_address, recipient_name, recipient_phone, payment_method]
        );
        await conn.end();
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
}

async function addOrderItem({ order_id, product_id, quantity, unit_price }) {
    try {
        const conn = await connection();
        const [result] = await conn.query(
            'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
            [order_id, product_id, quantity, unit_price]
        );
        await conn.end();
        return result.insertId;
    } catch (error) {
        throw new Error(`Failed to add order item: ${error.message}`);
    }
}

async function getOrdersByUserId(user_id) {
    try {
        const conn = await connection();
        const [orders] = await conn.query(
            `
            SELECT o.*, oi.product_id, oi.quantity, oi.unit_price, p.name
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.product_id
            WHERE o.user_id = ?
            `,
            [user_id]
        );
        await conn.end();
        return orders;
    } catch (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`);
    }
}

async function getOrderById(order_id) {
    try {
        const conn = await connection();
        const [orders] = await conn.query(
            `
            SELECT o.*, oi.product_id, oi.quantity, oi.unit_price, p.name
            FROM orders o
            LEFT JOIN order_items oi ON o.order_id = oi.order_id
            LEFT JOIN products p ON oi.product_id = p.product_id
            WHERE o.order_id = ?
            `,
            [order_id]
        );
        await conn.end();
        return orders[0];
    } catch (error) {
        throw new Error(`Failed to fetch order: ${error.message}`);
    }
}

async function updateOrderStatus(order_id, status) {
    try {
        const conn = await connection();
        const [result] = await conn.query(
            'UPDATE orders SET status = ? WHERE order_id = ?',
            [status, order_id]
        );
        await conn.end();
        return result.affectedRows;
    } catch (error) {
        throw new Error(`Failed to update order status: ${error.message}`);
    }
}

module.exports = { createOrder, addOrderItem, getOrdersByUserId, getOrderById, updateOrderStatus };