import React from 'react';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-4">
      <div className="container text-center">
        <p>&copy; {new Date().getFullYear()} Stylish Shop. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
