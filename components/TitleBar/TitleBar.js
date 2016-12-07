import React, { PropTypes } from 'react';
import './TitleBar.scss';

const TitleBar = (props) => (
  <div className="title-bar-container">
    {props.children}
  </div>
);

TitleBar.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TitleBar;
