import React, { PropTypes } from 'react';

const Banner = function (props) {
  return (
    <div>
      {props.children}
    </div>
  );
};

Banner.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Banner;
