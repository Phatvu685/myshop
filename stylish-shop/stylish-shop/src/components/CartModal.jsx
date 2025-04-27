import React, { useEffect, useState } from 'react';
import { getCart } from '../utils/api';

const CartModal = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCart() {
      try {
        const data = await getCart();
        setCartItems(data.cart || []);
      } catch (err) {
        setError('Failed to load cart');
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-modal">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.cart_item_id}>
              {item.name} - Quantity: {item.quantity} - Price: ${item.price || item.discount_price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartModal;
