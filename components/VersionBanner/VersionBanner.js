import React from 'react';

import './VersionBanner.scss';

const VersionBanner = (props) => {
  const {
    className,
    ...restProps
  } = props;

  return (
    <div {...restProps} className={`guide-list-header ${className}`}>
      <div className="guide-version-section">
        You are viewing Skygear v0 Documentation.
        <a className="guide-redirect-link" href="https://docs.skygear.io">
          Switch to Skygear v1 Documentation
        </a>
      </div>
    </div>
  );
};

export default VersionBanner;
