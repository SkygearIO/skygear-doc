import React, { PropTypes } from 'react';

import './Banner.scss';

const Banner = function (props) {
  return (
    <div className="banner">
      {props.children}
    </div>
  );
};

Banner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Banner;
