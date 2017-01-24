import React from 'react';
import './QuickStart.scss';

const QuickStart = () => (
  <div className="quick-start">
    <h1>Documentation</h1>
    <p className="quick-start-hint">New to Skygear?</p>
    <p>
      <form action="/guide/get-started/ios/">
        <button className="quick-start-button">Quick Start</button>
      </form>
    </p>
  </div>
);

export default QuickStart;
