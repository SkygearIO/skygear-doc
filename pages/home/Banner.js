import React, { PropTypes } from 'react';

import './Banner.scss';

const Banner = (props) => (
  <div className="banner">
    <div className="banner-icon-bg">
      {props.children}
    </div>
  </div>
);

Banner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Banner;
