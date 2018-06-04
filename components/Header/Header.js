import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import classNames from 'classnames';

import GuideSearchWidget
  from '../../components/GuideSearchWidget/GuideSearchWidget';
import Nav from './Nav/Nav';


import './Header.scss';

const NoOpCallback = () => null;

const NavigationItemsProps = [
  {
    text: 'Guides',
    href: '/guides/',
  },
  {
    text: 'API Referece',
    href: '/api-reference/',
  },
  {
    text: 'Demo',
    href: 'https://demo.skygear.io/',
  },
  {
    text: 'Forum',
    href: 'https://discuss.skygear.io/',
  },
  {
    text: 'Slack',
    href: 'https://slack.skygear.io/',
  },
];

class Header extends Component {
  constructor(props) {
    super(props);

    this.onNavigationPulldownClick
      = this.onNavigationPulldownClick.bind(this);
    this.renderNaviationItem = this.renderNaviationItem.bind(this);

    this.state = {
      headerNavigationPulldownOpen: false,
    };
  }

  onNavigationPulldownClick(event) {
    event.preventDefault();

    this.setState({
      headerNavigationPulldownOpen: !this.state.headerNavigationPulldownOpen,
    });
  }

  getActiveNavigationItemProps() {
    const currentPathname = window.location.pathname;
    return (
      _.find(
        NavigationItemsProps,
        ({ href }) => currentPathname.indexOf(href) === 0
      ) || NavigationItemsProps[0]
    );
  }

  renderNaviationItem({ text, href, ...otherProps }) {
    const currentPathname = window.location.pathname;
    let isActive = false;
    if (currentPathname.indexOf(href) === 0) {
      isActive = true;
    }

    return (
      <Nav
        key={`nav-item-${text.toLowerCase()}`}
        href={href}
        text={text}
        active={isActive}
        {...otherProps}
      />
    );
  }

  renderNavigationList() {
    return (
      <nav className="header-nav header-nav-list">
        {_.map(NavigationItemsProps, this.renderNaviationItem)}
      </nav>
    );
  }

  renderNavigationPulldown() {
    const isActive = this.state.headerNavigationPulldownOpen;
    const activeNavigationItemProps = this.getActiveNavigationItemProps();
    const displayItem = this.renderNaviationItem({
      ...activeNavigationItemProps,
      onClick: this.onNavigationPulldownClick,
      className: 'pulldown-display-item',
      active: isActive,
    });

    return (
      <nav
        className={classNames(
          'header-nav',
          'header-nav-pulldown',
          { active: isActive },
        )}
      >
        {displayItem}
        <div className="header-nav-pulldown-content">
          {_.map(NavigationItemsProps, this.renderNaviationItem)}
        </div>
      </nav>
    );
  }

  renderMobileHamburgerButton() {
    if (!this.props.showMobileHamburgerButton) {
      return null;
    }

    return (
      <div
        className="mobile-hamburger-button"
        onClick={this.props.onHamburgerButtonClick}
      />
    );
  }

  render() {
    return (
      <div className="header-banner">
        <div className="header-banner-background">
          <div className="header">
            <Link to="/" className="logo-anchor" />
            {this.renderNavigationList()}
            {this.renderNavigationPulldown()}
            <div className="widget-wrapper">
              {this.renderMobileHamburgerButton()}
              <GuideSearchWidget />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  showMobileHamburgerButton: PropTypes.bool,
  onHamburgerButtonClick: PropTypes.func,
};

Header.defaultProps = {
  showMobileHamburgerButton: false,
  onHamburgerButtonClick: NoOpCallback,
};

export default Header;
