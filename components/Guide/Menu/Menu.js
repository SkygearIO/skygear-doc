import { map } from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Link from '../../Link';
import { WindowLocation } from '../../../lib/Location';

import './Menu.scss';

class Menu extends Component {
  _renderSubMenuItem(subMenuItemContent, index) {
    let hash = WindowLocation.hash;

    const isActive = hash ?
      subMenuItemContent.url === hash :
      index === 0;

    return (
      <li
        className={classNames({
          'sub-menu-item': true,
          active: isActive,
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
          map(menuItemContent.sub, this._renderSubMenuItem.bind(this))
        }</ul>
      );
    } else {
      return undefined;
    }
  }

  _renderMenuItem(menuItemContent, index) {
    let pathname = WindowLocation.pathname;

    if (pathname && pathname.endsWith('/')) {
      pathname = pathname.substr(0, pathname.lastIndexOf('/'));
    }

    const isActive = menuItemContent.url === pathname;

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

  render() {
    return <ul className={classNames('Guide-Menu', ...this.props.classNames)}>{
      map(this.props.content, this._renderMenuItem.bind(this))
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
