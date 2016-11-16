import React from 'react';
import './Header.scss';
import Link from '../Link';

const Header = function () {
  return (
    <div className="Header">
      <Link className="Logo" to="/" />

      <ul className="Menu" role="menu">
        <li className="Menu-item">
          <a className="Menu-link" href="https://skygear.io">
            Features
          </a>
        </li>
        <li className="Menu-item">
          <Link className="Menu-link" to="/">
            <span>Docs</span>
          </Link>
        </li>
        <li className="Menu-item">
          <a className="Menu-link" href="https://github.com/skygearIO/">
            Github
          </a>
        </li>
        <li className="Menu-item primary">
          <Link className="Menu-link" to="/get-started">
            <span>Get Started</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
