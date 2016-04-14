/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component, PropTypes } from 'react';
import './Layout.scss';
import Navigation from '../Navigation';

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <Navigation />
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
