import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import LanguageLink from '../../components/LanguageLink/LanguageLink';

import './GuideListItem.scss';

const GuideListItem = (props) => {
  const { title, description, baseUrl, languages } = props.guide;
  const defaultUrl = baseUrl + (languages.length > 0 ? `${languages[0]}/` : '');
  return (
    <div className="guide-list-item">
      <div className="languages">
        {languages.map(language => (
          <LanguageLink
            key={language}
            language={language}
            isActive={false}
            url={`${baseUrl}${language}/`}
            isShowEmpty
          />
        ))}
      </div>
      <Link to={defaultUrl}>
        <div className="arrow" />
      </Link>
      <div className="item-info">
        <Link to={defaultUrl}>
          <h3>{title}</h3>
        </Link>
        <p className="description">{description}</p>
      </div>
    </div>
  );
};

GuideListItem.propTypes = {
  guide: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    baseUrl: PropTypes.string.isRequired,
    languages: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default GuideListItem;
