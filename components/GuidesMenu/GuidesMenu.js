import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import LanguageLink from '../LanguageLink/LanguageLink';
import guideListConfig from '../../pages/guideList/config';

import './GuidesMenu.scss';

function isEmptyLanguages(languages) {
  // also consider empty for ['']
  return !languages || languages.filter(v => v).length === 0;
}

class GuidesMenu extends Component {
  render() {
    const {
      currentGuide,
      currentLanguage,
      shouldShowInMobile,
    } = this.props;

    return (
      <div
        className={classNames(
          'guide-menu',
          { active: shouldShowInMobile }
        )}
      >
        <input type="radio" name="guide" id="placeholder-radio-button" />
        {guideListConfig.sections.map(section => (
          <div key={section.name} className="guides-menu-section">
            <p className="section-name">{section.name}</p>
            {section.guides.map((guide, index) => {
              const isCurrentGuide = _.matches(currentGuide)(guide);
              return (
                <div key={guide.title} className="guides-menu-item">
                  <input
                    type="radio"
                    name="guide"
                    id={`${section.name}${index}`}
                    defaultChecked={isCurrentGuide}
                  />
                  {isEmptyLanguages(guide.languages) &&
                    <label htmlFor="placeholder-radio-button">
                      <Link to={`${guide.baseUrl}/`}>
                        <p className={`guide-name ${isCurrentGuide ? 'active' : ''}`}>
                          {guide.title}
                        </p>
                      </Link>
                    </label>
                  }
                  {!isEmptyLanguages(guide.languages) &&
                    <label htmlFor={`${section.name}${index}`}>
                      <p className={`guide-name ${isCurrentGuide ? 'active' : ''}`}>
                        {guide.title}
                      </p>
                    </label>
                  }
                  {!isEmptyLanguages(guide.languages) &&
                    <label htmlFor="placeholder-radio-button">
                      <div className="collapse-button" />
                    </label>
                  }
                  {!isEmptyLanguages(guide.languages) &&
                    <div className="language-links">
                      {guide.languages.map(language => (
                        <LanguageLink
                          key={language}
                          language={language}
                          url={`${guide.baseUrl}${language}/`}
                          isShowEmpty={false}
                          isActive={_.matches(currentGuide)(guide) &&
                            language === currentLanguage}
                        />
                      ))}
                    </div>
                  }
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
}

GuidesMenu.propTypes = {
  currentGuide: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired,
  shouldShowInMobile: PropTypes.bool,
};

GuidesMenu.defaultProps = {
  shouldShowInMobile: false,
};

export default GuidesMenu;
