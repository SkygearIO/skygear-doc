/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component, PropTypes } from 'react';

import Header from '../Header';
import Footer from '../Footer';

import './Layout.scss';
import '../../styles/prism-atom-dark.css';

class Layout extends Component {
  render() {
    return (
      <div className="Layout">
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
