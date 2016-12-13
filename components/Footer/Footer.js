import React from 'react';
import './Footer.scss';

import SkygearLogo from '../../static/images/footer-logo.png';

const Footer = () => (
  <footer>
    <div className="footer-container">
      <div className="footer-row">
        <div className="footer-copyright-column">
          <p>
            <a href="https://skygear.io">
              <img src={SkygearLogo} alt="Skygear Logo" className="footer-logo" />
            </a>
          </p>
          <p>
            © 2008-2016 All rights reserved Oursky Ltd.
          </p>
        </div>
        <div className="footer-contact-column">
          <p>
            <span>Tel: +852 2155 9299 | Email: </span>
            <a href="mailto:hello@skygear.io">hello@skygear.io</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
