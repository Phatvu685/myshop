import React from 'react';

const Footer = () => {
  return (
    <footer id="footer" className="py-5 border-top">
      <div className="container-lg">
        <div className="row">
          {["Info", "About", "Women Shoes", "Popular", "Mens Collection"].map((title, idx) => (
            <div className="col-lg-2 pb-3" key={idx}>
              <div className="footer-menu">
                <h5 className="widget-title pb-2">{title}</h5>
                <ul className="menu-list list-unstyled">
                  <li className="pb-2"><a href="#">Track Your Order</a></li>
                  <li className="pb-2"><a href="/">Our Blog</a></li>
                  <li className="pb-2"><a href="#">Privacy policy</a></li>
                  <li className="pb-2"><a href="#">Shipping</a></li>
                  <li className="pb-2"><a href="#">Contact Us</a></li>
                  <li className="pb-2"><a href="#">Help</a></li>
                  <li className="pb-2"><a href="#">Community</a></li>
                </ul>
              </div>
            </div>
          ))}

          <div className="col-lg-2 pb-3">
            <div className="footer-menu">
              <h5 className="widget-title pb-3">Get In Touch</h5>
              <div className="footer-contact-text">
                <span>Stylish Online Store 123 Main Street, Toulouse - France. </span>
                <span> Call us: (+33) 800 456 789-987 </span>
                <span className="text-hover fw-bold light-border">
                  <a href="mailto:contact@yourwebsite.com">contact@yourwebsite.com</a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <p>© Copyright Stylish 2023.</p>
          </div>
          <div className="col-md-6 text-lg-end">
            <p>
              Free HTML by <a href="https://templatesjungle.com/" target="_blank" rel="noreferrer">TemplatesJungle</a><br />
              Distributed by <a href="https://themewagon.com" target="_blank" rel="noreferrer">ThemeWagon</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
