import React, { useEffect, useState } from 'react';
import { getPromotions } from '../utils/api';

const CouponBanner = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPromotions() {
      try {
        const data = await getPromotions();
        setPromotions(data);
      } catch (err) {
        setError('Failed to load promotions');
      } finally {
        setLoading(false);
      }
    }
    loadPromotions();
  }, []);

  if (loading) {
    return <div>Loading promotions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="coupon-banner" className="coupon-banner">
      <div className="container-md">
        {promotions.map((promo) => (
          <div key={promo.promotion_id || promo.id} className="promotion-item">
            <h3>{promo.title}</h3>
            <p>{promo.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CouponBanner;
