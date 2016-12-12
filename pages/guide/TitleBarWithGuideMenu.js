import React from 'react';

import TitleBar from '../../components/TitleBar/TitleBar';
import './TitleBarWithGuideMenu.scss';

const TitleBarWithGuideMenu = () => (
  <TitleBar>
    <div className="guides-title">
      <div className="hamburger-icon" />
      <h1>Guides</h1>
    </div>
  </TitleBar>
);

export default TitleBarWithGuideMenu;
