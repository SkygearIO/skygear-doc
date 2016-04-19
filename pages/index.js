import { map } from 'lodash';
import React, { Component } from 'react';
import Link from '../components/Link';
import Card from '../components/Card';

import '../styles/index.scss';

class IndexPage extends Component {
  _sectionList() {
    const { sectionInfo } = this.props;
    const sectionList = map(sectionInfo, (perSectionInfo, perSectionIndex) => {
      return (
        <Card
          className="section-item"
          key={'section-item-' + perSectionIndex}
          title={perSectionInfo.title}
          description={perSectionInfo.description}
          icon={perSectionInfo.icon}
          buttons={perSectionInfo.buttons}
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
  sectionInfo: [
    {
      title: 'iOS SDK',
      description: 'iOS Client',
      icon: require('../asserts/icn-ios-sdk.png'),
      buttons: [
        {
          name: 'Guide',
          url: '/ios/guide'
        },
        {
          name: 'API Reference',
          url: '/ios/reference'
        }
      ]
    },
    {
      title: 'JS SDK',
      description: 'Javascript Client',
      icon: require('../asserts/icn-js-sdk.png'),
      buttons: [
        {
          name: 'Guide',
          url: '/js/guide'
        },
        {
          name: 'API Reference',
          url: '/js/reference'
        }
      ]
    },
    {
      title: 'Cloud Code',
      description: 'Extend Skygear with Plugins or small snippet of code',
      icon: require('../asserts/icn-cloud-code.png'),
      buttons: [
        {
          name: 'Guide',
          url: '/cloud-code/guide'
        },
        {
          name: 'API Reference',
          url: '/cloud-code/reference'
        },
        {
          name: 'Plugins',
          url: '/cloud-code/plugins'
        }
      ]
    },
    {
      title: 'Plugin SDK',
      description: 'Develop your own Plugins',
      icon: require('../asserts/icn-plugin.png'),
      buttons: [
        {
          name: 'Guide',
          url: '/plugin/guide'
        },
        {
          name: 'API Reference',
          url: '/plugin/reference'
        }
      ]
    },
    {
      title: 'Command Line Tools',
      description: 'Manage Skygear Server from CLI',
      icon: require('../asserts/icn-cli.png'),
      buttons: [
        {
          name: 'Guide',
          url: '/cli/guide'
        },
        {
          name: 'API Reference',
          url: '/cli/reference'
        }
      ]
    },
    {
      title: 'Skygear Server',
      description: 'Deploy and Manage your Skygear Server',
      icon: require('../asserts/icn-skygear-core.png'),
      buttons: [
        {
          name: 'Guide',
          url: '/server/guide'
        },
        {
          name: 'API Reference',
          url: '/server/reference'
        }
      ]
    }
  ]
}

export default IndexPage;
