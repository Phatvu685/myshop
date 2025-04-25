const { createOrder: modelCreateOrder, addOrderItem: modelAddOrderItem, getOrdersByUserId: modelGetOrdersByUserId, getOrderById: modelGetOrderById, updateOrderStatus: modelUpdateOrderStatus } = require('../model/orderModel');
const { getCartByUserId: modelGetCartByUserId, deleteCartItem: modelDeleteCartItem } = require('../model/cartModel');

async function createOrder({ user_id, shipping_address, recipient_name, recipient_phone, payment_method }) {
    try {
        const cartItems = await modelGetCartByUserId(user_id);
        if (!cartItems.length) throw new Error('Cart is empty');

        let total_amount = 0;
        const shipping_fee = 10.00; // Giả định phí vận chuyển
        for (const item of cartItems) {
            const price = item.discount_price || item.price;
            total_amount += price * item.quantity;
        }
        total_amount += shipping_fee;

        const order_id = await modelCreateOrder({
            user_id,
            total_amount,
            shipping_fee,
            shipping_address,
            recipient_name,
            recipient_phone,
            payment_method,
        });

        for (const item of cartItems) {
            await modelAddOrderItem({
                order_id,
                product_id: item.product_id,
                quantity: item.quantity,
                unit_price: item.discount_price || item.price,
            });
            await modelDeleteCartItem(item.cart_item_id);
        }

        return order_id;
    } catch (error) {
        throw new Error(`Failed to create order: ${error.message}`);
    }
}

async function getOrders(user_id) {
    try {
        return await modelGetOrdersByUserId(user_id);
    } catch (error) {
        throw new Error(`Failed to fetch orders: ${error.message}`);
    }
}

async function getOrder(order_id) {
    try {
        const order = await modelGetOrderById(order_id);
        if (!order) throw new Error('Order not found');
        return order;
    } catch (error) {
        throw new Error(`Failed to fetch order: ${error.message}`);
    }
}

async function updateOrderStatus(order_id, status) {
    try {
        return await modelUpdateOrderStatus(order_id, status);
    } catch (error) {
        throw new Error(`Failed to update order status: ${error.message}`);
    }
}

module.exports = { createOrder, getOrders, getOrder, updateOrderStatus };
