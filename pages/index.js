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
          <a
            className="primary"
            href="/get-started"
            onClick={Link.handleClick}
          >Guide</a>
          <a
            className="primary"
            href="/tutorial"
            onClick={Link.handleClick}
          >Tutorials</a>
        </div>
        {this._sectionList()}
        <div className="contributing-info">
          <h2>Contributing</h2>
          <ul>
            <li>
              <a
                href="/contributing"
                onClick={Link.handleClick}
              >How to contribute</a>
            </li>
            <li>
              <a
                href="/faq"
                onClick={Link.handleClick}
              >FAQ</a>
            </li>
            <li>
              <a
                href="/release-cycle"
                onClick={Link.handleClick}
              >Release cycle</a>
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
