import React, { useState, useEffect } from 'react';
import { login, getCart } from '../utils/api';

const Header = () => {
  const [user, setUser] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data or cart
      getCart().then((res) => setCartItems(res.data));
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        email: e.target.email.value,
        password: e.target.password.value,
      });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      getCart().then((res) => setCartItems(res.data));
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setCartItems([]);
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img src="/images/logo.png" alt="Logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#bdNavbar">
            <svg className="navbar-icon"><use href="#navbar-icon"></use></svg>
          </button>
          <div className="offcanvas offcanvas-end" id="bdNavbar">
            <div className="offcanvas-header">
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav mx-auto">
                <li className="nav-item"><a className="nav-link" href="/">Home</a></li>
                <li className="nav-item"><a className="nav-link" href="/shop">Shop</a></li>
                <li className="nav-item"><a className="nav-link" href="/about">About</a></li>
                <li className="nav-item"><a className="nav-link" href="/contact">Contact</a></li>
              </ul>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <button className="nav-link btn btn-link p-0 m-0 text-decoration-none text-reset" type="button" data-bs-toggle="collapse" data-bs-target="#search-box" aria-label="Toggle search">
                    <svg className="search"><use href="#search"></use></svg>
                  </button>
                </li>
                <li className="nav-item">
                  {user ? (
                    <button className="nav-link btn btn-link p-0 m-0 text-decoration-none text-reset" type="button" onClick={handleLogout}>Logout</button>
                  ) : (
                    <button className="nav-link btn btn-link p-0 m-0 text-decoration-none text-reset" type="button" data-bs-toggle="modal" data-bs-target="#modallogin">Login</button>
                  )}
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-link p-0 m-0 text-decoration-none text-reset" type="button" data-bs-toggle="modal" data-bs-target="#modallong" aria-label="Open cart">
                    <svg className="shopping-cart"><use href="#shopping-cart"></use></svg>
                    <span>{cartItems.length}</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="collapse search-box" id="search-box">
        <div className="card">
          <div className="card-body">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search for products" />
              <button className="btn btn-outline-secondary" type="button">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal fade" id="modallogin">
        <div className="modal-dialog modal-md modal-dialog-centered">
          <div className="modal-content p-4">
            <div className="modal-header border-0">
              <h2 className="modal-title fs-3">Login</h2>
            </div>
            <div className="modal-body">
              <form onSubmit={handleLogin}>
                <input type="email" name="email" placeholder="Email Address *" className="mb-3 ps-3 text-input" required />
                <input type="password" name="password" placeholder="Password" className="ps-3 text-input" required />
                <div className="modal-footer mt-5 d-flex justify-content-center">
                  <button type="submit" className="btn btn-red hvr-sweep-to-right">Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;