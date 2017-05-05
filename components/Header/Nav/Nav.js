import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import './Nav.scss';

const Nav = ({ active, href, img, text }) => {
  const content = [
    <img key='nav-img' src={img} alt={text} />,
    <span key='nav-text'>{text}</span>
  ];

  const cxn = classNames('header-nav-item', { active });

  if (href) {
    return <Link className={cxn} to={href}>{content}</Link>;
  }

  return <a className={cxn} href='#'>{content}</a>;
};

Nav.propTypes = {
  active: PropTypes.bool,
  href: PropTypes.string,
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Nav.defaultProps = {
  active: false,
  href: null
};

export default Nav;
