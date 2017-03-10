import React from 'react';

import GuideListSection from './GuideListSection';
import ContentIndex from '../../content.index';

import './GuideList.scss';

const GuideList = () => (
  <div className="guide-list">
    {ContentIndex.sections.map(section => (
      <GuideListSection key={section.name} section={section} />
    ))}
  </div>
);

export default GuideList;
