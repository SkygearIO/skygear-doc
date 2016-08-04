import { map, forEach, cloneDeep } from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Link from '../../Link';
import { Window } from '../../../lib/BrowserProxy';

import './Menu.scss';

class Menu extends Component {
  constructor(props) {
    super(props);
    this._renderMenuItem = this._renderMenuItem.bind(this);
    this._renderSubMenuItem = this._renderSubMenuItem.bind(this);
  }

  _renderSubMenuItem(subMenuItemContent, index) {
    return (
      <li
        className={classNames({
          'sub-menu-item': true,
          active: subMenuItemContent.isActive,
        })}
        key={'sub-menu-item-' + index}
      >
        <Link to={subMenuItemContent.url || '#'}>
          <span>{subMenuItemContent.title}</span>
        </Link>
      </li>
    );
  }

  _renderSubMenu(menuItemContent, isActive) {
    if (isActive && menuItemContent.sub && menuItemContent.sub.length > 0) {
      return (
        <ul className="sub-menu">{
          map(menuItemContent.sub, this._renderSubMenuItem)
        }</ul>
      );
    } else {
      return undefined;
    }
  }

  _renderMenuItem(menuItemContent, index) {
    const { isActive } = menuItemContent;
    return (
      <li
        className={classNames({
          'menu-item': true,
          active: isActive,
        })}
        key={'menu-item-' + index}
      >
        <Link to={menuItemContent.url || '#'}>
          <span>{menuItemContent.title}</span>
        </Link>
        {this._renderSubMenu(menuItemContent, isActive)}
      </li>
    );
  }

  getUrlSensitiveContent() {
    const {
      content,
      preferredLocationHash,
    } = this.props;

    let pathname = Window.location.pathname;
    if (pathname && pathname.endsWith('/')) {
      pathname = pathname.substr(0, pathname.lastIndexOf('/'));
    }

    let hash = Window.location.hash;
    if (preferredLocationHash) {
      hash = preferredLocationHash
    }

    const windowUrl = pathname + hash;
    return map(content, function (perContent) {
      let isActive = false;

      const sub = map(perContent.sub || [], function (perSubContent) {
        let perSubContentActive = false;
        let url = perSubContent.url || '#';

        if (url.indexOf('#') === 0) {
          url = perContent.url + url;
        }

        if (windowUrl === url) {
          isActive = true;
          perSubContentActive = true;
        }

        return {
          ...perSubContent,
          isActive: perSubContentActive,
          url
        }
      });

      if (!isActive) {
        isActive = (windowUrl === perContent.url);
      }

      return {
        ...perContent,
        isActive,
        sub
      };
    });
  }

  render() {
    return <ul className={classNames('Guide-Menu', ...this.props.classNames)}>{
      map(this.getUrlSensitiveContent(), this._renderMenuItem)
    }</ul>;
  }
}

Menu.propTypes = {
  content: PropTypes.array.isRequired,
  classNames: PropTypes.array,
};

Menu.defaultProps = {
  classNames: [],
};

export default Menu;
