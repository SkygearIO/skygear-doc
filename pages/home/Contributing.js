import React from 'react';
import './Contributing.scss';

const items = [
  {
    title: 'How to contribute',
    url: 'https://github.com/SkygearIO/skygear-server#how-to-contribute',
  },
  {
    title: 'GitHub',
    url: 'https://github.com/skygeario/skygear-server',
  },
  {
    title: 'Releases',
    url: 'https://github.com/SkygearIO/skygear-server/releases',
  },
];

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
          {items.map(({ title, url }) => (
            <li key={title}><a href={url}>{title}</a></li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Contributing;
