import React, { Component } from 'react';
import Guide from '../../components/Guide';

export default class extends Component {
  render() {
    return (
      <Guide
        sectionName="JS SDK"
        title="How to install JS SDK"
        content={require("../../content/js/index.md")}
      />
    );
  }
}
