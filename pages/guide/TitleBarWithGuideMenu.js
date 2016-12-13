import React, { PropTypes } from 'react';

import TitleBar from '../../components/TitleBar/TitleBar';
import GuidesMenu from './GuidesMenu';

import './TitleBarWithGuideMenu.scss';

const TitleBarWithGuideMenu = (props) => (
  <TitleBar>
    <div className="guides-title">
      <input type="checkbox" id="hamburger-menu-toggle" />
      <label htmlFor="hamburger-menu-toggle">
        <div className="hamburger-icon" />
      </label>
      <h1>Guides</h1>
      <GuidesMenu
        currentGuide={props.currentGuide}
        currentLanguage={props.currentLanguage}
      />
    </div>
  </TitleBar>
);

TitleBarWithGuideMenu.propTypes = {
  currentGuide: PropTypes.object.isRequired,
  currentLanguage: PropTypes.string.isRequired,
};

export default TitleBarWithGuideMenu;
