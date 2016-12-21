import React, { PropTypes } from 'react';

import GuideListItem from './GuideListItem';

import './GuideListSection.scss';

const GuideListSection = (props) => (
  <div className="guide-list-section">
    <h2 id={props.section.name}>{props.section.name}</h2>
    {props.section.guides.map(guide => (
      <GuideListItem key={guide.title} guide={guide} />
    ))}
  </div>
);

GuideListSection.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string.isRequired,
    guides: PropTypes.array,
  }).isRequired,
};

export default GuideListSection;
