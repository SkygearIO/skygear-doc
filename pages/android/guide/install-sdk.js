import React from 'react';
import Guide from '../../../components/Guide'
import SkygearGetstarted from '../../../lib/skygear-getstarted';
import menu from '../../../menus/android-guide.json';

export default function () {
  return (
    <Guide
      sectionName="Android SDK"
      title="Installing SDK"
      menu={menu}
      content={<SkygearGetstarted sdk="android" hideSDKTabs />}
    />
  );
}
