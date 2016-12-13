import React from 'react';
import './Header.scss';
import { Link } from 'react-router';

import logo from '../../static/docs-logo.png';

const Header = () => (
  <div className="header">
    <Link to="/">
      <img src={logo} className="logo" alt="Skygear Documentation" />
    </Link>
  </div>
);

export default Header;
