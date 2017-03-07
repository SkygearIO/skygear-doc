import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './Nav.scss';

const Nav = ({ href, img, text }) => (
  <Link className="header-nav" to={href}>
    <img src={img} alt={text} />
    <span>{text}</span>
  </Link>
);

Nav.propTypes = {
  href: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Nav;
