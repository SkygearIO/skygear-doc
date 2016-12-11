import React, { PropTypes } from 'react';

import './Guide.scss';
import 'highlight.js/styles/default.css';

const Guide = (props) => (
  <div className="guide">
    <h1>{props.title}</h1>
    <div className="guide-content" dangerouslySetInnerHTML={{ __html: props.docHtml }} />
  </div>
);

Guide.propTypes = {
  title: PropTypes.string,
  docHtml: PropTypes.string,
};

export default Guide;
