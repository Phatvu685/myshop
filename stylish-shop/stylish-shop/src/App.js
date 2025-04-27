import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CouponBanner from './components/CouponBanner';
import FeaturedProducts from './components/FeaturedProducts';
import Collections from './components/Collections';
import LatestProducts from './components/LatestProducts';
import Footer from './components/Footer';
import CartModal from './components/CartModal';
import SwiperCore from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css';

const App = () => {
  useEffect(() => {
    SwiperCore.use([Navigation, Pagination]);
    new SwiperCore('.main-swiper', {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 1,
        },
      },
    });
  }, []);

  return (
    <div>
      <Header />
      <Hero />
      <CouponBanner />
      <FeaturedProducts />
      <Collections />
      <LatestProducts />
      <Footer />
      <CartModal />
    </div>
  );
};

export default App;