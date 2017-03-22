import React, { PropTypes } from 'react';

import TitleBar from '../TitleBar/TitleBar';

import GuideSearchWidget from '../../components/GuideSearchWidget/GuideSearchWidget';

import './TitleBarWithMenuButton.scss';

const TitleBarWithMenuButton = (props) => (
  <TitleBar>
    <div className="guides-title">
      <div
        className="hamburger-icon"
        onClick={props.onMenuButtonClick}
      />
      <h1>Guides</h1>
    </div>
    <GuideSearchWidget />
  </TitleBar>
);

TitleBarWithMenuButton.propTypes = {
  onMenuButtonClick: PropTypes.func.isRequired,
};

export default TitleBarWithMenuButton;
