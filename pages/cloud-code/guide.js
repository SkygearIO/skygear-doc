import React, { Component } from 'react';
import GuideTemplate from '../../components/GuideTemplate';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="Cloud Code"
        title="Developing Your First Plugin"
        content={require("../../content/plugin/first-plugin.md")}
      />
    );
  }
}
