import React, { Component } from 'react';
import Guide from '../../components/Guide';

export default class extends Component {
  render() {
    return (
      <Guide
        sectionName="Command Line Tools"
        title="Introduction to CLI"
        content={require("../../content/cli/intro.md")}
      />
    );
  }
}
