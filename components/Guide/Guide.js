import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classNames from 'classnames';
import _ from 'lodash';

import Markdown from '../../components/Markdown';
import Menu from './Menu';

import './Guide.scss';
import { Window } from '../../lib/BrowserProxy';

const HamburgerMenuIcon = require('../../asserts/icn-hamburger.png');

class Guide extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.updateRouteHash = this.updateRouteHash.bind(this);
    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
    this.dismissHamburgerMenu = this.dismissHamburgerMenu.bind(this);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      sticky: false,
      hamburgerMenuShwon: false,
      menuScrollAnchor: null,
    };
  }

  get titleComponent() {
    const { title } = this.props;

    if (title && title.length > 0) {
      return <h1>{title}</h1>;
    }

    return undefined;
  }

  get sectionTitleomponent() {
    let classes = [ 'section-title' ];
    if (this.state.sticky) {
      classes.push('sticky-section-title');
    }

    return (
      <div className={classes.join(' ')}>
        <h1>{this.props.sectionName}</h1>
        <img src={HamburgerMenuIcon} onClick={this.toggleHamburgerMenu}/>
      </div>
    );
  }

  get menuComponent() {
    const {
      menu,
      activeMenu,
    } = this.props;

    if (!menu) {
      return undefined;
    }

    let classes = [ 'menu' ];
    if (this.state.sticky) {
      classes.push('sticky-menu');
    }
    if (this.state.hamburgerMenuShwon) {
      classes.push('active');
    }

    return (
      <Menu
        classNames={classes}
        content={menu || []}
        preferredLocationHash={this.state.menuScrollAnchor}
      />
    );
  }

  toggleHamburgerMenu(event) {
    event.preventDefault();
    this.setState({
      hamburgerMenuShwon: !this.state.hamburgerMenuShwon
    });
  }

  dismissHamburgerMenu(event) {
    if (this.state.hamburgerMenuShwon) {
      this.setState({
        hamburgerMenuShwon: false
      });
    }
  }

  updateRouteHash() {
    const thisElement = findDOMNode(this);
    if (thisElement) {
      const allAnchors = thisElement.querySelectorAll('a[name]');
      if (allAnchors.length === 0) {
        return;
      }

      /*
       * The logic is as following:
       * 1) Find all anchor tags like: <a name="..."></a>
       * 2) Get all names and sorted by scrollTop value of the anchor tag
       * 3) Get the name of the last past anchor tag;
       *    Otherwise, get the first one.
       */
      const allAnchorData = _.map(
        allAnchors,
        (eachAnchor) => ({
          name: eachAnchor.getAttribute('name'),
          scrollTop: eachAnchor.getBoundingClientRect().top
        })
      );
      const sortedAnchorData = _.sortBy(allAnchorData, 'scrollTop');
      const pastAnchorData = _.filter(
        sortedAnchorData,
        ({ scrollTop }) => scrollTop < 100
      );

      let targetAnchorName = null;
      const pastAnchorDataSize = pastAnchorData.length;
      if (pastAnchorDataSize > 0) {
        targetAnchorName = pastAnchorData[pastAnchorDataSize - 1].name;
      } else {
        targetAnchorName = sortedAnchorData[0].name;
      }

      this.setState({
        menuScrollAnchor: '#' + targetAnchorName
      });
    }
  }

  handleScroll() {
    const scrollTop = Window.scrollY || 0;
    const shouldSticky = scrollTop > 85;

    this.updateRouteHash();
    if (shouldSticky !== this.state.sticky) {
      this.setState({
        sticky: scrollTop > 85
      });
    }
  }

  componentDidMount() {
    Window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    Window.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    const {
      content,
    } = this.props;

    return (
      <div className='Guide-Template' onClick={this.dismissHamburgerMenu}>
        {this.sectionTitleomponent}
        <div className="container">
          {this.menuComponent}
          <div className="content">
            {this.titleComponent}
            <Markdown content={content} />
          </div>
        </div>
      </div>
    );
  }
}

Guide.propTypes = {
  content: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  menu: PropTypes.array,

  title: PropTypes.string,
  activeMenu: PropTypes.string,
};

export default Guide;
