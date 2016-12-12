import React from 'react';

import './ApiReference.scss';

const ApiReference = () => (
  <div className="api-reference">
    <a href="http://cocoadocs.org/docsets/SKYKit/" target="_blank">
      <div className="api-reference-item">
        <h2 className="ios-sdk">
          iOS SDK
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="https://docs.skygear.io/android/reference/" target="_blank">
      <div className="api-reference-item">
        <h2 className="android-sdk">
          Android SDK
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="https://doc.esdoc.org/github.com/skygeario/skygear-SDK-JS/" target="_blank">
      <div className="api-reference-item">
        <h2 className="js-sdk">
          JavaScript SDK
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
  </div>
);

export default ApiReference;
