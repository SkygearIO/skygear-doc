import React, { PropTypes } from 'react';

import { currentVersion } from '../../config';
import './VersionBanner.scss';

const VERSION_CONFIG = {
  redirectMapping: {
    v0: 'v1',
    v1: 'v0',
  },
  redirectLink: {
    v0: 'https://docs-v0.skygear.io',
    v1: 'https://docs.skygear.io',
  },
};

function parseVersion(version) {
  if (version.startsWith('v') && version.indexOf('.') !== -1) {
    return version.split('.')[0];
  }

  return version;
}

const VersionBanner = (props) => {
  const {
    className,
    ...restProps
  } = props;

  const versions = {
    from: parseVersion(currentVersion),
    to: VERSION_CONFIG.redirectMapping[parseVersion(currentVersion)],
  };

  return (
    <div {...restProps} className={`guide-list-header ${className}`}>
      <div className="guide-version-section">
        You are viewing Skygear {versions.from} Documentation.
        {
          versions.to &&
            <a
              className="guide-redirect-link"
              href={VERSION_CONFIG.redirectLink[versions.to]}
            >
              Switch to Skygear {versions.to} Documentation
            </a>
        }
      </div>
    </div>
  );
};

VersionBanner.propTypes = {
  className: PropTypes.string,
};

export default VersionBanner;
