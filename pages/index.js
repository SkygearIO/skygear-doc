import { map } from 'lodash';
import React, { Component } from 'react';

import Link from '../components/Link';
import Card from '../components/Card';

import indexInfo from '../store/index';

import '../styles/index.scss';

class IndexPage extends Component {
  _sectionList() {
    const { indexInfo } = this.props;
    const sectionList = map(indexInfo, (perIndexInfo, idx) => {
      return (
        <Card
          className="section-item"
          key={'section-item-' + idx}
          title={perIndexInfo.title}
          description={perIndexInfo.description}
          icon={perIndexInfo.icon}
          buttons={perIndexInfo.buttons}
        />
      );
    });

    return <ul className="section-list">{sectionList}</ul>;
  }

  render() {
    return (
      <div className="Index">
        <h1>Documentation</h1>
        <hr />
        <div className="get-started-info">
          <h2>Just getting started?</h2>
          <Link className="primary" to="/get-started">
            <span>Guide</span>
          </Link>
          <Link className="primary" to="/tutorial">
            <span>Tutorials</span>
          </Link>
        </div>
        {this._sectionList()}
        <div className="contributing-info">
          <h2>Contributing</h2>
          <ul>
            <li>
              <Link to="/coming-soon">
                <span>How to contribute</span>
              </Link>
            </li>
            <li>
              <Link to="/coming-soon">
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
    );
  }
}

IndexPage.defaultProps = {
  indexInfo
}

export default IndexPage;
