import React, { Component } from 'react';
import Markdown from '../components/Markdown';

export default class extends Component {

  render() {
    return (
      <div>
        <Markdown content={require("../content/toc/index.md")} />
      </div>
    );
  }
}
