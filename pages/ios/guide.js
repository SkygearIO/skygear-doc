import React, { Component } from 'react';
import Guide from '../../components/Guide';

import store from '../../store/ios';

export default class extends Component {
  render() {
    return (
      <Guide
        sectionName="iOS SDK"
        menu={store.guide.menu}
        title="How to install SkyKit SDK in Xcode"
        content={require("../../content/ios/getting-started.md")}
      />
    );
  }
}
