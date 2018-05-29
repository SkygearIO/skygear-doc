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

  if (href && href.indexOf('https') !== 0) {
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
      target='_blank'
      className={cxNames}
      href={href}
      {...otherProps}
    >
      {content}
    </a>
  );
};

Nav.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  href: PropTypes.string,
  text: PropTypes.string.isRequired,
};

Nav.defaultProps = {
  active: false,
  href: null,
  className: '',
};

export default Nav;
