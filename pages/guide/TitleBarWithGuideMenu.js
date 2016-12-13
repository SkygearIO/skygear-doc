import React from 'react';

import TitleBar from '../../components/TitleBar/TitleBar';
import GuidesMenu from './GuidesMenu';

import './TitleBarWithGuideMenu.scss';

const TitleBarWithGuideMenu = () => (
  <TitleBar>
    <div className="guides-title">
      <input type="checkbox" id="hamburger-menu-toggle" />
      <label htmlFor="hamburger-menu-toggle">
        <div className="hamburger-icon" />
      </label>
      <h1>Guides</h1>
      <GuidesMenu />
    </div>
  </TitleBar>
);

export default TitleBarWithGuideMenu;
