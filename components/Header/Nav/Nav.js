import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

const Nav = (props) => {
  const {
    active,
    href,
    img,
    imageOnMobile,
    activeImageOnMobile,
    text,
    className,
    ...otherProps
  } = props;

  const content = [
    <img
      key="nav-img"
      src={img}
      alt={text}
    />,
    <img
      key="nav-img-mobile"
      className="mobile"
      src={imageOnMobile || img}
      alt={text}
    />,
    <img
      key="nav-img-mobile-active"
      className="mobile-active"
      src={activeImageOnMobile || imageOnMobile || img}
      alt={text}
    />,
    <span key="nav-text">
      {text}
    </span>,
  ];

  const cxNames =
    classNames(
      'header-nav-item',
      { active },
      className.split(' '),
    );

  if (href && href.indexOf('#') !== 0) {
    return (
      <Link
        className={cxNames}
        to={href}
        {...otherProps}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      className={cxNames}
      href="#"
      {...otherProps}
    >
      {content}
    </a>
  );
};

Nav.propTypes = {
  active: PropTypes.bool,
  activeImageOnMobile: PropTypes.string,
  imageOnMobile: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  img: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

Nav.defaultProps = {
  active: false,
  href: null,
  className: '',
};

export default Nav;
