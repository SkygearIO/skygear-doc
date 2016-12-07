import React from 'react';
import { Link } from 'react-router';
import './Contributing.scss';

const Contributing = () => (
  <div className="contributing-container">
    <div className="contributing-wrapper">
      <div className="contributing-row">
        <div className="contributing-column-title">
          <p className="contributing-text">
            Contributing
          </p>
        </div>
        <ul className="contributing-column-items">
          <li><Link to="#">How to contribute</Link></li>
          <li><Link to="#">FAQ</Link></li>
          <li><Link to="#">Release cycle</Link></li>
          <li><Link to="#">GitHub</Link></li>
        </ul>
      </div>
    </div>
  </div>
);

export default Contributing;
