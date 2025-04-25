const { getCart, addCartItem, updateCartItem, deleteCartItem } = require('../services/cartService');

async function getCart(req, res) {
    try {
        const cart = await getCart(req.user.user_id);
        res.json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

async function addCartItem(req, res) {
    try {
        const { product_id, quantity } = req.body;
        const cartItemId = await addCartItem({
            user_id: req.user.user_id,
            product_id,
            quantity,
        });
        res.status(201).json({ success: true, message: 'Item added to cart', cartItemId });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function updateCartItem(req, res) {
    try {
        const { cart_item_id } = req.params;
        const { quantity } = req.body;
        const affectedRows = await updateCartItem(cart_item_id, quantity);
        if (!affectedRows) throw new Error('Cart item not found');
        res.json({ success: true, message: 'Cart item updated' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

async function deleteCartItem(req, res) {
    try {
        const { cart_item_id } = req.params;
        const affectedRows = await deleteCartItem(cart_item_id);
        if (!affectedRows) throw new Error('Cart item not found');
        res.json({ success: true, message: 'Cart item deleted' });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
}

module.exports = { getCart, addCartItem, updateCartItem, deleteCartItem };