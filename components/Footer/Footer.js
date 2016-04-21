import React, { Component } from 'react';
import './Footer.scss';
import Link from '../Link';

const logoUrl = require('../../asserts/skygear-logo-sm-white.png');

export default class extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="container">
          <div className="info">
            <a className="Logo" href="https://skygear.io">
              <img src={logoUrl} />
            </a>
            <div>© 2008-2016 All rights reserved Oursky Ltd.</div>
            <div>
              <span>Tel: +852 2155 9299 | Email: </span>
              <a href="mailto:hello@skygear.io">hello@skygear.io</a>
            </div>
          </div>
          <ul className="nav">
            <li className="nav-item">
              <Link className="nav-link" to="/get-started">
                <span>Get started</span>
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://skygear.io">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://github.com/skygearIO/">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
