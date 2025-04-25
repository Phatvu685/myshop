import React from 'react';
import products from '../data/products';

const FeaturedProducts = () => {
  return (
    <section id="featured-products" className="product-store">
      <div className="container-md">
        <div className="display-header d-flex align-items-center justify-content-between">
          <h2 className="section-title text-uppercase">Featured Products</h2>
          <div className="btn-right">
            <a href="/" className="d-inline-block text-uppercase text-hover fw-bold">View all</a>
          </div>
        </div>
        <div className="product-content padding-small">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
            {products.map(product => (
              <div className="col mb-4" key={product.id}>
                <div className="product-card position-relative">
                  <div className="card-img">
                    <img src={product.image} alt={product.name} className="product-image img-fluid" />
                    <div className="cart-concern position-absolute d-flex justify-content-center">
                      <div className="cart-button d-flex gap-2 justify-content-center align-items-center">
                        <button type="button" className="btn btn-light" data-bs-toggle="modal" data-bs-target="#modallong">
                          <svg className="shopping-carriage"><use xlinkHref="#shopping-carriage" /></svg>
                        </button>
                        <button type="button" className="btn btn-light" data-bs-target="#modaltoggle" data-bs-toggle="modal">
                          <svg className="quick-view"><use xlinkHref="#quick-view" /></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-center mt-3">
                    <h3 className="card-title fs-6 fw-normal m-0">
                      <a href="/">{product.name}</a>
                    </h3>
                    <span className="card-price fw-bold">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
