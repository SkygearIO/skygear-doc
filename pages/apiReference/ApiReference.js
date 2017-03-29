import React from 'react';

import './ApiReference.scss';

const ApiReference = () => (
  <div className="api-reference">
    <a
      href="https://docs.skygear.io/ios/reference/"
      target="_blank"
    >
      <div className="api-reference-item">
        <h2 className="ios-sdk">
          iOS SDK (User Auth, Push, Cloud DB, Pubsub)
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="https://docs.skygear.io/android/reference/" target="_blank">
      <div className="api-reference-item">
        <h2 className="android-sdk">
          Android SDK (User Auth, Push, Cloud DB, Pubsub)
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="https://doc.esdoc.org/github.com/skygeario/skygear-SDK-JS/" target="_blank">
      <div className="api-reference-item">
        <h2 className="js-sdk">
          JavaScript SDK (User Auth, Push, Cloud DB, Pubsub)
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="http://cocoadocs.org/docsets/SKYKitChat/" target="_blank">
      <div className="api-reference-item">
        <h2 className="ios-sdk">
          iOS SDK (Chat)
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="https://docs.skygear.io/android/plugins/chat/reference/" target="_blank">
      <div className="api-reference-item">
        <h2 className="android-sdk">
          Android SDK (Chat)
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="https://doc.esdoc.org/github.com/skygeario/chat-SDK-JS/" target="_blank">
      <div className="api-reference-item">
        <h2 className="js-sdk">
          JavaScript SDK (Chat)
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
    <a href="https://doc.esdoc.org/github.com/skygeario/skygear-SDK-JS/function/index.html" target="_blank">
      <div className="api-reference-item">
        <h2 className="js-sdk">
            JS API Reference (Cloud Functions)
        </h2>
        <div className="right-arrow" />
      </div>
    </a>
  </div>
);

export default ApiReference;
