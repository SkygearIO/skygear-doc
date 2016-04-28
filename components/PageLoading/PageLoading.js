import React, { Component } from 'react';
import loadingGif from './loading.gif.base64';

export default class extends Component {
  render() {
    const pageLoaderStyle = {
      position: 'fixed',
      backgroundColor: '#fff',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
    const pageLoaderContainerStyle = {
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '3rem',
      height: 'auto',
      margin: '-1.5rem 0 0 -1.5rem',
    };

    return (
      <div {...this.props} style={pageLoaderStyle}>
        <img src={loadingGif} style={pageLoaderContainerStyle} />
      </div>
    );
  }
};
