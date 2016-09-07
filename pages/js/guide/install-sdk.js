import React from 'react';
import Guide from '../../../components/Guide'
import SkygearGetstarted from '../../../lib/skygear-getstarted';
import menu from '../../../menus/js-guide.json';

import '../../../styles/install-sdk.scss';

export default function () {
  const contentComponent = (
    <SkygearGetstarted
      className="get-started"
      sdk="js"
      hideSDKTabs />
  );

  return (
    <Guide
      sectionName="JS SDK"
      title="Quick Start"
      menu={menu}
      content={contentComponent}
    />
  );
}
