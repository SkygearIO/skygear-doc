import React from 'react';
import Guide from '../../../components/Guide'
import SkygearGetstarted from '../../../lib/skygear-getstarted';
import menu from '../../../menus/ios-guide.json';

import '../../../styles/install-sdk.scss';

export default function () {
  const contentComponent = (
    <SkygearGetstarted
      className="get-started"
      sdk="ios"
      hideSDKTabs />
  );

  return (
    <Guide
      sectionName="iOS SDK"
      title="Quick Start"
      menu={menu}
      content={contentComponent}
    />
  );
}
