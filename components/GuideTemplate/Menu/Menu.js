import { map } from 'lodash';
import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Link from '../../Link';

import './Menu.scss';

class Menu extends Component {
  _renderSubMenuItem(subMenuItemContent, index) {
    const { activeSubtitle } = this.props;
    const isActive =
      activeSubtitle &&
      subMenuItemContent.title === activeSubtitle;

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
    const { activeTitle } = this.props;
    const isActive =
      activeTitle &&
      menuItemContent.title === activeTitle;

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
    return <ul className={classNames('Guide-Menu', this.props.className)}>{
      map(this.props.content, this._renderMenuItem.bind(this))
    }</ul>;
  }
}

Menu.propTypes = {
  content: PropTypes.array.isRequired,
  className: PropTypes.string,
  activeTitle: PropTypes.string,
  activeSubtitle: PropTypes.string,
};

Menu.defaultProps = {
  className: '',
};

export default Menu;
