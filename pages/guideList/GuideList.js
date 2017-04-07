import React from 'react';

import GuideListSection from './GuideListSection';
import ContentIndex from '../../content.index';
import Footer from '../../components/Footer/Footer';

import './GuideList.scss';

const GuideList = () => (
  <div className="guide-list-container">
    <div className="guide-list">
      {ContentIndex.sections.map(section => (
        <GuideListSection key={section.name} section={section} />
      ))}
    </div>
    <Footer />
  </div>
);

export default GuideList;
