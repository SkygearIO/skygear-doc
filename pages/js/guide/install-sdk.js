import React from 'react';
import Guide from '../../../components/Guide'
import SkygearGetstarted from '../../../lib/skygear-getstarted';
import menu from '../../../menus/js-guide.json';

export default function () {
  return (
    <Guide
      sectionName="JS SDK"
      title="Installing SDK"
      menu={menu}
      content={<SkygearGetstarted sdk="js" hideSDKTabs />}
    />
  );
}
