import React, { PropTypes } from 'react';

import LanguageLink from '../../components/LanguageLink/LanguageLink';

import './Guide.scss';
import 'highlight.js/styles/default.css';

const Guide = (props) => (
  <div className="guide">
    <div className="guide-header">
      <h1>{props.title}</h1>
      <div className="language-selector">
        {props.languageOptions.map(({ language, url }) => (
          <LanguageLink
            key={language}
            language={language}
            url={url}
            isActive={language === props.language}
          />
        ))}
      </div>
    </div>
    <div className="guide-content" dangerouslySetInnerHTML={{ __html: props.docHtml }} />
  </div>
);

Guide.propTypes = {
  title: PropTypes.string,
  docHtml: PropTypes.string,
  languageOptions: PropTypes.array,
  language: PropTypes.string.isRequired,
};

export default Guide;
