import React, { Component } from 'react';
import Guide from '../../components/Guide';

export default class extends Component {
  render() {
    return (
      <Guide
        sectionName="Cloud Code"
        title="Developing Your First Plugin"
        content={require("../../content/plugin/first-plugin.md")}
      />
    );
  }
}
