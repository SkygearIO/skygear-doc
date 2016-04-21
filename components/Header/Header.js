import React, { Component } from 'react';
import './Header.scss';
import Link from '../Link';

const logoUrl = require('../../asserts/skygear-logo-sm.png');

export default class extends Component {
  render() {
    return (
      <div className="Header">
        <a
          className="Logo"
          href="https://skygear.io"
          onClick={Link.handleClick}
        >
          <img src={logoUrl} />
        </a>

        <ul className="Menu" role="menu">
          <li className="Menu-item">
            <a
              className="Menu-link"
              href="https://skygear.io"
              onClick={Link.handleClick}
            >Features</a>
          </li>
          <li className="Menu-item">
            <a
              className="Menu-link"
              href="/"
              onClick={Link.handleClick}
            >Docs</a>
          </li>
          <li className="Menu-item">
            <a
              className="Menu-link"
              href="https://github.com/skygearIO/"
              onClick={Link.handleClick}
            >Github</a>
          </li>
          <li className="Menu-item primary">
            <a
              className="Menu-link"
              href="/get-started"
              onClick={Link.handleClick}
            >Get Started</a>
          </li>
        </ul>
      </div>
    );
  }
}
