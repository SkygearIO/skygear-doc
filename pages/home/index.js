import { map } from 'lodash';
import React, { Component } from 'react';
import { Link } from 'react-router';

import Layout from '../../components/Layout';
import Card from '../../components/Card/Card';

import menuConfig from './config';

import './index.scss';

class IndexPage extends Component {
  _sectionList() {
    const sectionList = map(menuConfig, (perMenu, idx) => (
      <Card
        className="section-item"
        key={`section-item-${idx}`}
        title={perMenu.title}
        description={perMenu.description}
        icon={perMenu.icon}
        buttons={perMenu.buttons}
      />
    ));

    return <ul className="section-list">{sectionList}</ul>;
  }

  render() {
    return (
      <Layout>
        <div className="Index">
          <h1>Documentation</h1>
          <hr />
          {this._sectionList()}
          <div className="contributing-info">
            <h2>Contributing</h2>
            <ul>
              <li>
                <Link to="/coming-soon/">
                  <span>How to contribute</span>
                </Link>
              </li>
              <li>
                <Link to="/coming-soon/">
                  <span>FAQ</span>
                </Link>
              </li>
              <li>
                <Link to="/release-cycle">
                  <span>Release cycle</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
