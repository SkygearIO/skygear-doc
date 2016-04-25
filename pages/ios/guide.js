import React, { Component } from 'react';
import GuideTemplate from '../../components/GuideTemplate';

import store from '../../store/ios';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="iOS SDK"
        menu={store.guide.menu}
        activeMenu="How to install SkyKit SDK in Xcode"
        title="How to install SkyKit SDK in Xcode"
        content={require("../../content/ios/getting-started.md")}
      />
    );
  }
}
