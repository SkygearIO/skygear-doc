import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './LanguageLink.scss';

const labels = {
  ios: 'iOS',
  android: 'Android',
  js: 'JavaScript',
  python: 'Python',
};

const LanguageLink = (props) => (
  <Link to={props.url}>
    <div className="language-link">
      <div className={`language-icon ${props.language}`} />
      <p className="text">{labels[props.language]}</p>
    </div>
  </Link>
);

LanguageLink.propTypes = {
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default LanguageLink;
