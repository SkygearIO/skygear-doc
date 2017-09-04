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
          title="Core - iOS SDK (User Auth, Push, Cloud DB, Pubsub)"
        />
        <AndroidApiReferenceItem
          url="https://docs.skygear.io/android/reference/"
          title="Core - Android SDK (User Auth, Push, Cloud DB, Pubsub)"
        />
        <JavascriptApiReferenceItem
          url="https://docs.skygear.io/js/reference/"
          title="Core - JavaScript SDK (User Auth, Push, Cloud DB, Pubsub)"
        />
        <IosApiReferenceItem
          url="http://cocoadocs.org/docsets/SKYKitChat/"
          title="Chat - iOS SDK"
        />
        <AndroidApiReferenceItem
          url="/android/plugins/chat/reference/"
          title="Chat - Android SDK"
        />
        <JavascriptApiReferenceItem
          url="https://doc.esdoc.org/github.com/skygeario/chat-SDK-JS/"
          title="Chat - JavaScript SDK"
        />
        <JavascriptApiReferenceItem
          url="https://docs.skygear.io/js/reference/latest/identifiers.html#skygear-core-lib-cloud"
          title="Cloud Function - Javascript API Reference"
        />
      </div>
      <Footer />
    </div>
  </div>
);
