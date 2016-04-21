import React, { Component } from 'react';
import GuideTemplate from '../../components/GuideTemplate';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="JS SDK"
        title="How to install JS SDK"
        content={require("../../content/js/index.md")}
      />
    );
  }
}
