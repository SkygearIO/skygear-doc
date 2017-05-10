import React, { Component, PropTypes } from 'react';

import './GuideSearchItem.scss';

import IosLogo from '../../static/images/ios.png';
import AndroidLogo from '../../static/images/android.png';
import JavascriptLogo from '../../static/images/js.png';
import PythonLogo from '../../static/images/python.png';
import SkygearLogo from '../../static/skygear-logo-mini.png';

const ContentSubstringLeftOffset = 50;
const ContentSubstringLength = 150;

const getImageByPlatform = (platform) => {
  if (!platform) {
    return null;
  }

  const lowerCasePlatformName = platform.toLowerCase();
  switch (lowerCasePlatformName) {
    case 'ios':
      return IosLogo;
    case 'android':
      return AndroidLogo;
    case 'js':
    case 'javascript':
      return JavascriptLogo;
    case 'py':
    case 'python':
      return PythonLogo;
    default:
      return null;
  }
};

class GuideSearchItem extends Component {
  renderGuideImage() {
    const { item } = this.props;
    const { platform } = item.meta;
    const platformImage = getImageByPlatform(platform);

    return (
      <img src={item.image || platformImage || SkygearLogo} alt="guide" />
    );
  }

  renderTitle() {
    const { item } = this.props;
    const hitTitleInfo = item._highlightResult.title;

    if (hitTitleInfo.matchedWords.length > 0) {
      return <h1 dangerouslySetInnerHTML={{ __html: hitTitleInfo.value }} />;
    }

    return <h1>{item.title}</h1>;
  }

  renderMatchedContent() {
    const { value, matchedWords } = this.props.item._highlightResult.content;

    if (matchedWords.length === 0) {
      return null;
    }

    // find the index of the emphasis tag
    const startIndex = value.indexOf('<em>');
    if (startIndex === -1) {
      console.warn('Cannot find the highlighted match on guide content'); // eslint-disable-line
      return null;
    }

    // make the substring with an left offset (if applicable)
    let substring;
    if (startIndex > ContentSubstringLeftOffset) {
      substring = value
        .substr(startIndex - ContentSubstringLeftOffset, ContentSubstringLength)
        .split(' ')
        .slice(1, -1)
        .join(' ');
      substring = `... ${substring} ...`;
    } else {
      substring = value
        .substr(0, ContentSubstringLength)
        .split(' ')
        .slice(0, -1)
        .join(' ');
      substring = `${substring} ...`;
    }

    return (
      <span
        className="guide-search-item-content"
        dangerouslySetInnerHTML={{ __html: substring }}
      />
    );
  }

  render() {
    return (
      <section className="guide-search-item">
        {this.renderGuideImage()}
        <div className="guide-search-item-container">
          {this.renderTitle()}
          {this.renderMatchedContent()}
        </div>
      </section>
    );
  }
}

GuideSearchItem.propTypes = {
  item: PropTypes.object,
};

export default GuideSearchItem;
