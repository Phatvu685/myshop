const { createOrder, getOrders, getOrder, updateOrderStatus } = require('../services/orderService');

async function createOrder(req, res) {
    try {
        const { shipping_address, recipient_name, recipient_phone, payment_method } = req.body;
        const orderId = await createOrder({
            user_id: req.user.user_id,
            shipping_address,
            recipient_name,
            recipient_phone,
            payment_method,
        });
        res.status(201).json({ success: true, message: 'Order created', orderId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function getOrders(req, res) {
    try {
        const orders = await getOrders(req.user.user_id);
        res.json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function getOrder(req, res) {
    try {
        const order = await getOrder(req.params.id);
        res.json({ success: true, order });
    } catch (error) {
        res.status(404).json({ success: false, message: error.message });
    }
}

async function updateOrderStatus(req, res) {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const affectedRows = await updateOrderStatus(id, status);
        if (!affectedRows) throw new Error('Order not found');
        res.json({ success: true, message: 'Order status updated' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus };