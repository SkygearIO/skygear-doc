import React, { Component, PropTypes } from 'react';

import './GuideSearchItem.scss';

const DefaultImagea = require('../../static/skygear-logo-mini.png');

const ContentSubstringLeftOffset = 50;
const ContentSubstringLength = 150;

class GuideSearchItem extends Component {
  renderTitle() {
    const { item } = this.props;
    const hitTitleInfo = item._highlightResult.title;

    if (hitTitleInfo.matchedWords.length > 0) {
      return <h1 dangerouslySetInnerHTML={{ __html: hitTitleInfo.value }} />;
    }

    return <h1>{item.title}</h1>;
  }

  renderDescription() {
    const { item } = this.props;
    if (!item.description) {
      return null;
    }

    const hitDescriptionInfo = item._highlightResult.description;
    if (hitDescriptionInfo.matchedWords.length > 0) {
      return (
        <span
          className="guide-search-item-description"
          dangerouslySetInnerHTML={{ __html: hitDescriptionInfo.value }}
        />
      );
    }

    return (
      <span className="guide-search-item-description">
        {item.description}
      </span>
    );
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
    const { item } = this.props;

    return (
      <section className="guide-search-item">
        <img src={item.image || DefaultImagea} alt="guide" />
        <div className="guide-search-item-container">
          {this.renderTitle()}
          {this.renderDescription()}
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
