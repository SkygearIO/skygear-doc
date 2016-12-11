import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './LanguageLink.scss';

const labels = {
  ios: 'iOS',
  android: 'Android',
  js: 'JavaScript',
  python: 'Python',
};

const LanguageLink = (props) => {
  const { url, language, isActive } = props;
  return (
    <Link to={url}>
      <div className={`language-link ${isActive ? 'active' : ''}`}>
        <div className={`language-icon ${language}`} />
        <p className="text">{labels[language]}</p>
      </div>
    </Link>
  );
};

LanguageLink.propTypes = {
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default LanguageLink;
