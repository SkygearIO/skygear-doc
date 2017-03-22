import React, { PropTypes } from 'react';

import './GuideSearchItem.scss';

const DefaultImagea = require('../../static/skygear-logo-mini.png');

const GuideSearchItem = (props) => {
  const { item } = props;

  let guideDescription = null;
  if (item.description) {
    guideDescription = (
      <span className="guide-search-item-description">
        {item.description}
      </span>
    );
  }

  return (
    <section className="guide-search-item">
      <img src={item.image || DefaultImagea} alt="guide" />
      <div className="guide-search-item-content">
        <h1>{item.title}</h1>
        {guideDescription}
        <span className="guide-search-item-url">
          {item.url}
        </span>
      </div>
    </section>
  );
};

GuideSearchItem.propTypes = {
  item: PropTypes.object,
};

export default GuideSearchItem;
