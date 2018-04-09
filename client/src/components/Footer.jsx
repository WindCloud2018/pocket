import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-left">
        <h4>Authors</h4>
        <ul>
          <li><i class="fab fa-github"></i> Carson Chen </li>
          <li><i class="fab fa-github"></i> Nian Liu</li>
        </ul>
      </div>
      <div className="footer-right">
        Right
      </div>
    </div>
  );
}

export default Footer;
