import React, { Component } from 'react';
import GuideTemplate from '../../components/GuideTemplate';

export default class extends Component {
  render() {
    return (
      <GuideTemplate
        sectionName="Skygear Server"
        title="Skygear Server Configuration"
        content={require("../../content/server/configuring.md")}
      />
    );
  }
}
