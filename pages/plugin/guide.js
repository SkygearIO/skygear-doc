import React, { Component } from 'react';
import Guide from '../../components/Guide';

export default class extends Component {
  render() {
    return (
      <Guide
        sectionName="Plugin SDK"
        title="Plugin Introduction"
        content={require("../../content/plugin/intro.md")}
      />
    );
  }
}
