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

const PythonApiReferenceItem
  = (props) => <ApiReferenceItem {...props} titleClassName="py-sdk" />;

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
          url="https://docs.skygear.io/ios/chat/reference/latest/"
          title="Chat - iOS SDK"
        />
        <AndroidApiReferenceItem
          url="https://docs.skygear.io/android/chat/reference/latest/"
          title="Chat - Android SDK"
        />
        <JavascriptApiReferenceItem
          url="https://docs.skygear.io/js/chat/reference/latest/"
          title="Chat - JavaScript SDK"
        />
        <JavascriptApiReferenceItem
          url="https://docs.skygear.io/js/chat/reference/latest/class/lib/cloud.js~SkygearChatCloudContainer.html"
          title="Chat Cloud Function - JavaScript API Reference"
        />
        <JavascriptApiReferenceItem
          url="https://docs.skygear.io/js/reference/latest/identifiers.html#skygear-core-lib-cloud"
          title="Cloud Function - Javascript API Reference"
        />
        <PythonApiReferenceItem
          url="https://docs.skygear.io/py/reference/latest/"
          title="Cloud Function - Python API Reference"
        />
      </div>
      <Footer />
    </div>
  </div>
);
