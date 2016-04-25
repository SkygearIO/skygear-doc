import React, { Component } from 'react';
import Guide from '../components/Guide';

export default class extends Component {
  render() {
    return (
      <Guide
        sectionName="Skygear"
        title="Getting Started"
        content={require("../content/intro/getting-started.md")}
      />
    );
  }
}
