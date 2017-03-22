import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import LanguageLink from '../LanguageLink/LanguageLink';

import './GuidesMenu.scss';

class GuidesMenu extends Component {
  constructor(props) {
    super(props);

    this.renderLanguageLinks = this.renderLanguageLinks.bind(this);
    this.renderLanguageLink = this.renderLanguageLink.bind(this);
    this.renderSectionMenuItem = this.renderSectionMenuItem.bind(this);
    this.renderGuideMenuItem = this.renderGuideMenuItem.bind(this);
  }

  renderLanguageLinks() {
    const { currentGuide } = this.props;
    const availableLanguages = currentGuide.languages
      .filter(language => language.length > 0);

    if (availableLanguages.length < 2) {
      return null;
    }

    return (
      <div className="language-links">
        {availableLanguages.map(this.renderLanguageLink)}
      </div>
    );
  }

  renderLanguageLink(language) {
    const { currentGuide, currentLanguage } = this.props;

    return (
      <LanguageLink
        key={language}
        language={language}
        url={`${currentGuide.baseUrl}${language}/`}
        isShowEmpty={false}
        isActive={language === currentLanguage}
      />
    );
  }

  renderSectionMenuItem(section) {
    return (
      <section key={section.name} className="guides-menu-section">
        <p className="section-name">{section.name}</p>
        {section.guides.map(this.renderGuideMenuItem)}
      </section>
    );
  }

  renderGuideMenuItem(guide) {
    const { currentGuide, currentLanguage } = this.props;
    const { title, baseUrl, languages } = guide;

    let targetUrl = baseUrl;
    if (languages.length > 0) {
      if (currentLanguage && languages.indexOf(currentLanguage) !== -1) {
        targetUrl += `${currentLanguage}/`;
      } else {
        targetUrl += `${languages[0]}/`;
      }
    }

    let currentGuideUrl = currentGuide.baseUrl;
    if (currentLanguage) {
      currentGuideUrl += `${currentLanguage}/`;
    } else {
      currentGuideUrl += '/';
    }

    return (
      <div key={title} className="guides-menu-item">
        <Link to={targetUrl}>
          <p
            className={classNames(
              'guide-name',
              { active: targetUrl === currentGuideUrl }
            )}
          >
            {guide.title}
          </p>
        </Link>
      </div>
    );
  }

  render() {
    const { contentIndex, shouldShowInMobile } = this.props;

    return (
      <div className={classNames('guide-menu', { active: shouldShowInMobile })}>
        {this.renderLanguageLinks()}
        <nav>
          {contentIndex.sections.map(this.renderSectionMenuItem)}
        </nav>
      </div>
    );
  }
}

GuidesMenu.propTypes = {
  contentIndex: PropTypes.object.isRequired,
  currentGuide: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string,
  shouldShowInMobile: PropTypes.bool,
};

GuidesMenu.defaultProps = {
  shouldShowInMobile: false,
};

export default GuidesMenu;
