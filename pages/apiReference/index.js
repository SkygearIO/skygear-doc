import React, { PropTypes } from 'react';

import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

import './style.scss';

const ApiReferenceItem = ({ url, title, titleClassName }) => (
  <a href={url} target="_blank">
    <div className="api-reference-item">
      <h2 className={titleClassName}>{title}</h2>
      <div className="right-arrow" />
    </div>
  </a>
);

ApiReferenceItem.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleClassName: PropTypes.string,
};

ApiReferenceItem.defaultProps = {
  titleClassName: '',
};

const IosApiReferenceItem
  = (props) => <ApiReferenceItem {...props} titleClassName="ios-sdk" />;

const AndroidApiReferenceItem
  = (props) => <ApiReferenceItem {...props} titleClassName="android-sdk" />;

const JavascriptApiReferenceItem
  = (props) => <ApiReferenceItem {...props} titleClassName="js-sdk" />;

export default () => (
  <div className="api-reference-page">
    <Header />
    <div className="api-reference-container">
      <div className="api-reference">
        <IosApiReferenceItem
          url="https://docs.skygear.io/ios/reference/"
          title="iOS SDK (User Auth, Push, Cloud DB, Pubsub)"
        />
        <AndroidApiReferenceItem
          url="https://docs.skygear.io/android/reference/"
          title="Android SDK (User Auth, Push, Cloud DB, Pubsub)"
        />
        <JavascriptApiReferenceItem
          url="https://docs.skygear.io/js/reference/v0.24/"
          title="JavaScript SDK (User Auth, Push, Cloud DB, Pubsub)"
        />
        <IosApiReferenceItem
          url="http://cocoadocs.org/docsets/SKYKitChat/"
          title="iOS SDK (Chat)"
        />
        <AndroidApiReferenceItem
          url="https://docs.skygear.io/android/plugins/chat/reference/"
          title="Android SDK (Chat)"
        />
        <JavascriptApiReferenceItem
          url="https://doc.esdoc.org/github.com/skygeario/chat-SDK-JS/"
          title="JavaScript SDK (Chat)"
        />
        <JavascriptApiReferenceItem
          url="https://docs.skygear.io/js/reference/v0.24/"
          title="JS API Reference (Cloud Functions)"
        />
      </div>
      <Footer />
    </div>
  </div>
);
