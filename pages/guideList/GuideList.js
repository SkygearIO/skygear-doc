import React from 'react';

import GuideListSection from './GuideListSection';
import guideListConfig from './config';

import './GuideList.scss';

const GuideList = () => (
  <div className="guide-list">
    {guideListConfig.sections.map(section => (
      <GuideListSection section={section} />
    ))}
  </div>
);

export default GuideList;
