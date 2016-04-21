import React, { Component } from 'react';
import GuideTemplate from '../../components/GuideTemplate';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="Command Line Tools"
        title="Introduction to CLI"
        content={require("../../content/cli/intro.md")}
      />
    );
  }
}
