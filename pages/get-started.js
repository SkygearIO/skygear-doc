import React, { Component } from 'react';
import GuideTemplate from '../components/GuideTemplate';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="Skygear"
        title="Getting Started"
        content={require("../content/intro/getting-started.md")}
      />
    );
  }
}
