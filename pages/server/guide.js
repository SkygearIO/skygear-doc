import React, { Component } from 'react';
import Guide from '../../components/Guide';

export default class extends Component {
  render() {
    return (
      <Guide
        sectionName="Skygear Server"
        title="Skygear Server Configuration"
        content={require("../../content/server/configuring.md")}
      />
    );
  }
}
