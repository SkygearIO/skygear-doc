import React, { PropTypes } from 'react';
import Footer from '../../components/Footer/Footer';

import './Guide.scss';
import 'highlight.js/styles/xcode.css';

const Guide = (props) => (
  <div className="guide">
    <h1 className="guide-header">{props.title}</h1>
    <div
      className="guide-content"
      dangerouslySetInnerHTML={{ __html: props.docHtml }}
    />
    <Footer />
  </div>
);

Guide.propTypes = {
  title: PropTypes.string,
  docHtml: PropTypes.string,
  languageOptions: PropTypes.array,
  language: PropTypes.string.isRequired,
};

export default Guide;
