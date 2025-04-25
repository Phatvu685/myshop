const { getCartByUserId, addCartItem, updateCartItem, deleteCartItem, getOrCreateCart } = require('../models/cartModel');

async function getCart(user_id) {
    try {
        return await getCartByUserId(user_id);
    } catch (error) {
        throw new Error(`Failed to fetch cart: ${error.message}`);
    }
}

async function addCartItem({ user_id, product_id, quantity }) {
    try {
        const cart_id = await getOrCreateCart(user_id);
        return await addCartItem({ cart_id, product_id, quantity });
    } catch (error) {
        throw new Error(`Failed to add cart item: ${error.message}`);
    }
}

async function updateCartItem(cart_item_id, quantity) {
    try {
        return await updateCartItem(cart_item_id, quantity);
    } catch (error) {
        throw new Error(`Failed to update cart item: ${error.message}`);
    }
}

async function deleteCartItem(cart_item_id) {
    try {
        return await deleteCartItem(cart_item_id);
    } catch (error) {
        throw new Error(`Failed to delete cart item: ${error.message}`);
    }
}

module.exports = { getCart, addCartItem, updateCartItem, deleteCartItem };