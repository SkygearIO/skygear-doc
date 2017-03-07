import React, { PropTypes } from 'react';
import './Header.scss';
import { Link } from 'react-router';

import logo from '../../static/docs-logo.png';

const Header = (props) => (
  <div className="header">
    <Link to="/">
      <img src={logo} className="logo" alt="Skygear Documentation" />
    </Link>
    <nav>
      {props.children}
    </nav>
  </div>
);

Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
