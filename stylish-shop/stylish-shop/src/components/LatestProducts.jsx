import React from 'react';

const LatestProducts = () => {
  return (
    <section id="latest-products" className="product-store py-2 my-2 py-md-5 my-md-5 pt-0">
      <div className="container-md">
        <div className="display-header d-flex align-items-center justify-content-between">
          <h2 className="section-title text-uppercase">Latest Products</h2>
          <div className="btn-right">
            <a href="/" className="d-inline-block text-uppercase text-hover fw-bold">View all</a>
          </div>
        </div>
        <div className="product-content padding-small">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
            {[6, 7, 8, 9, 10].map(i => (
              <div className="col mb-4 mb-3" key={i}>
                <div className="product-card position-relative">
                  <div className="card-img">
                    <img src={`/images/card-item${i}.jpg`} alt="product-item" className="product-image img-fluid" />
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
                      <a href="/">Running shoes for men</a>
                    </h3>
                    <span className="card-price fw-bold">$99</span>
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

export default LatestProducts;