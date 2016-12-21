import React, { PropTypes } from 'react';
import SkygearGetStarted from '../../lib/skygear-getstarted';

import LanguageLink from '../../components/LanguageLink/LanguageLink';

// import './Guide.scss';
// import 'highlight.js/styles/default.css';

const GetStarted = (props) => (
  <div className="guide">
    <div className="guide-header">
      <h1>Get Started</h1>
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
    <div className="guide-content">
      <SkygearGetStarted sdk={props.language} hideSDKTabs />
    </div>
  </div>
);

GetStarted.propTypes = {
  languageOptions: PropTypes.array,
  language: PropTypes.string.isRequired,
};

export default GetStarted;
