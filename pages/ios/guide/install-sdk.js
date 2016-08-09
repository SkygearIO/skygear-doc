import React from 'react';
import Guide from '../../../components/Guide'
import SkygearGetstarted from '../../../lib/skygear-getstarted';
import menu from '../../../menus/ios-guide.json';

export default function () {
  return (
    <Guide
      sectionName="iOS SDK"
      title="Installing SDK"
      menu={menu}
      content={<SkygearGetstarted sdk="ios" hideSDKTabs />}
    />
  );
}
