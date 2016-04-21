import React, { Component } from 'react';
import GuideTemplate from '../../components/GuideTemplate';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="iOS SDK"
        title="How to install SkyKit SDK in Xcode"
        content={require("../../content/ios/getting-started.md")}
      />
    );
  }
}
