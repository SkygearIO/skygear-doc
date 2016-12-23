import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import './LanguageLink.scss';

const labels = {
  ios: 'iOS',
  android: 'Android',
  js: 'JavaScript',
  python: 'Python',
  placeholder: 'View',
};

const LanguageLink = (props) => {
  const { url, language, isActive, isShowEmpty } = props;

  if (!isShowEmpty && !language) {
    return false;
  }

  return (
    <Link to={url}>
      <div className={`language-link ${isActive ? 'active' : ''}`}>
        <div className={`language-icon ${language || 'placeholder'}`} />
        <p className="text">{labels[language || 'placeholder']}</p>
      </div>
    </Link>
  );
};

LanguageLink.propTypes = {
  language: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  isShowEmpty: PropTypes.bool.isRequired,
};

export default LanguageLink;
