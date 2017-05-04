import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import logo from '../../static/docs-logo.png';

import './Header.scss';

const Header = (props) => (
  <div className="header-banner">
    <div className="header-banner-background">
      <div className="header">
        <Link to="/" className="logo-anchor" />
        <nav className="header-nav">{props.children}</nav>
      </div>
    </div>
  </div>
);

Header.propTypes = {
  children: PropTypes.array
};

Header.defaultProps = {
  children: []
};

export default Header;
