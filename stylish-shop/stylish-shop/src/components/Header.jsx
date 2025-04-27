import React, { useState, useEffect } from 'react';
import { login, getCart } from '../utils/api';

const Header = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState(localStorage.getItem('token') || '');
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    if (userToken) {
      fetchCart();
    }
  }, [userToken]);

  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartItems(data.cart || []);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      localStorage.setItem('token', data.token);
      setUserToken(data.token);
      setEmail('');
      setPassword('');
      fetchCart();
    } catch (error) {
      alert(error.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken('');
    setCartItems([]);
  };

  return (
    <header>
      <div className="login-form">
        {!userToken ? (
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        ) : (
          <div>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
      <div className="cart-info">
        <span>Cart Items: {cartItems.length}</span>
      </div>
    </header>
  );
};

export default Header;
