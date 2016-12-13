import React from 'react';

import guideListConfig from '../guideList/config';

import './GuidesMenu.scss';

const GuidesMenu = () => (
  <div className="guides-menu-container">
    <div className="guides-menu">
      <div className="back-to-overview">
        <div className="left-arrow" />
        <p>Back To Overview</p>
      </div>
      {guideListConfig.sections.map(section => (
        <div key={section.name} className="guides-menu-section">
          <p className="section-name">{section.name}</p>
          {section.guides.map(guide => (
            <div key={guide.title} className="guides-menu-item">
              <p className="guide-name">{guide.title}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export default GuidesMenu;
