import React, { Component } from 'react';
import GuideTemplate from '../../components/GuideTemplate';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="Plugin SDK"
        title="Plugin Introduction"
        content={require("../../content/plugin/intro.md")}
      />
    );
  }
}
