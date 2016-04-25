import React, { Component, PropTypes } from 'react';

import './Markdown.scss';

class Markdown extends Component {

  render() {
    let { content } = this.props;
    return (
      <div
        className="Markdown"
        dangerouslySetInnerHTML={{__html: content}}
      />
    );
  }
}

Markdown.propTypes = {
  content: PropTypes.string.isRequired
};

export default Markdown;
