import { map } from 'lodash';
import React, { Component, PropTypes } from 'react';

import Link from '../../Link';

import './Menu.scss';

class Menu extends Component {
  renderSubMenu(content) {
    if (!content || content.length === 0) {
      return undefined;
    }

    const { activeSubtitle } = this.props;
    const subMenuItems = map(content, (perMenuItem, idx) => {
      const isActive = activeSubtitle && perMenuItem.title === activeSubtitle;

      return (
        <li
          className={'sub-menu-item' + (isActive ? ' active' : '')}
          key={'sub-menu-item-' + idx}
        >
          <Link to={perMenuItem.url || '#'}>
            <span>{perMenuItem.title}</span>
          </Link>
        </li>
      );
    });

    return <ul className="sub-menu">{subMenuItems}</ul>;
  }

  render() {
    const {
      content,
      activeTitle,
      className,
    } = this.props;

    const menuItems = map(content, (perMenuItem, idx) => {
      const isActive = activeTitle && perMenuItem.title === activeTitle;

      let subMenu;
      if (isActive) {
        subMenu = this.renderSubMenu(perMenuItem.sub);
      }

      return (
        <li
          className={'menu-item' + (isActive ? ' active' : '')}
          key={'menu-item-' + idx}
        >
          <Link to={perMenuItem.url || '#'}>
            <span>{perMenuItem.title}</span>
          </Link>
          {subMenu}
        </li>
      );
    });

    return <ul className={'Guide-Menu ' + className}>{menuItems}</ul>;
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
