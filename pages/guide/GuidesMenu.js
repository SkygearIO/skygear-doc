import _ from 'lodash';
import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import LanguageLink from '../../components/LanguageLink/LanguageLink';
import guideListConfig from '../guideList/config';

import './GuidesMenu.scss';

const GuidesMenu = (props) => (
  <div className="guides-menu-container">
    <div className="guides-menu">
      <Link to="/guides/">
        <div className="back-to-overview">
          <div className="left-arrow" />
          <p>Back To Overview</p>
        </div>
      </Link>
      <input type="radio" name="guide" id="placeholder-radio-button" />
      {guideListConfig.sections.map(section => (
        <div key={section.name} className="guides-menu-section">
          <p className="section-name">{section.name}</p>
          {section.guides.map((guide, index) => (
            <div key={guide.title} className="guides-menu-item">
              <input
                type="radio"
                name="guide"
                id={`${section.name}${index}`}
                checked={_.matches(props.currentGuide)(guide)}
              />
              <label htmlFor={`${section.name}${index}`}>
                <p className="guide-name">{guide.title}</p>
              </label>
              <label htmlFor="placeholder-radio-button">
                <div className="collapse-button" />
              </label>
              <div className="language-links">
                {guide.languages.map(language => (
                  <LanguageLink
                    key={language}
                    language={language}
                    url={`${guide.baseUrl}${language}/`}
                    isActive={_.matches(props.currentGuide)(guide) &&
                      language === props.currentLanguage}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

GuidesMenu.propTypes = {
  currentGuide: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};

export default GuidesMenu;
