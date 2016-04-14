import React, { Component, PropTypes } from 'react';

class Markdown extends Component {

  render() {
    let { content } = this.props;
    return (
      <div dangerouslySetInnerHTML={{__html: content}} />
    );
  }
}

Markdown.propTypes = {
  content: PropTypes.string.isRequired
};

export default Markdown;
