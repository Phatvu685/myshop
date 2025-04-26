import React from 'react';

const Collections = () => {
  return (
    <section id="collection-products" className="py-2 my-2 py-md-5 my-md-5">
      <div className="container-md">
        <div className="row">
          <div className="col-lg-6 col-md-6 mb-4">
            <div className="collection-card card border-0 d-flex flex-row align-items-end jarallax-keep-img">
              <img src="/images/collection-item1.jpg" alt="product-item" className="border-rounded-10 img-fluid jarallax-img" />
              <div className="card-detail p-3 m-3 p-lg-5 m-lg-5">
                <h3 className="card-title display-3"><button className="btn btn-link p-0 m-0 text-decoration-none text-reset">Minimal Collection</button></h3>
                <a href="/" className="text-uppercase mt-3 d-inline-block text-hover fw-bold">Shop Now</a>
              </div>
            </div>
          </div>

          <div className="col-lg-6 col-md-6">
            <div className="collection-card card border-0 d-flex flex-row jarallax-keep-img">
              <img src="/images/collection-item2.jpg" alt="product-item" className="border-rounded-10 img-fluid jarallax-img" />
              <div className="card-detail p-3 m-3 p-lg-5 m-lg-5">
                <h3 className="card-title display-3"><button className="btn btn-link p-0 m-0 text-decoration-none text-reset">Sneakers Collection</button></h3>
                <a href="/" className="text-uppercase mt-3 d-inline-block text-hover fw-bold">Shop Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collections;