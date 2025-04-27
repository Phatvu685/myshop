import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../utils/api';

const Collections = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) {
    return <div>Loading collections...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="collections" className="product-store">
      <div className="container-md">
        <div className="display-header d-flex align-items-center justify-content-between">
          <h2 className="section-title text-uppercase">Collections</h2>
          <div className="btn-right">
            <a href="/" className="d-inline-block text-uppercase text-hover fw-bold">View all</a>
          </div>
        </div>
        <div className="product-content padding-small">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-5">
            {products.map(product => (
              <div className="col mb-4" key={product.product_id || product.id}>
                <div className="product-card position-relative">
                  <div className="card-img">
                    <img src={product.image || product.images?.[0] || '/images/collection-item1.jpg'} alt={product.name} className="product-image img-fluid" />
                  </div>
                  <div className="card-detail d-flex justify-content-between align-items-center mt-3">
                    <h3 className="card-title fs-6 fw-normal m-0">
                      <a href="/">{product.name}</a>
                    </h3>
                    <span className="card-price fw-bold">${product.price || product.discount_price}</span>
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

export default Collections;
