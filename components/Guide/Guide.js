import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Markdown from '../../components/Markdown';
import Menu from './Menu';

import './Guide.scss';
import { Window } from '../../lib/BrowserProxy';

const HamburgerMenuIcon = require('../../asserts/icn-hamburger.png');

class Guide extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.toggleHamburgerMenu = this.toggleHamburgerMenu.bind(this);
    this.dismissHamburgerMenu = this.dismissHamburgerMenu.bind(this);
    this.state = this.initialState;
  }

  get initialState() {
    return {
      sticky: false,
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
        <img src={HamburgerMenuIcon} onClick={this.toggleHamburgerMenu}/>
        <h1>{this.props.sectionName}</h1>
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
        activeTitle={activeMenu}
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

  handleScroll() {
    const scrollTop = Window.scrollY || 0;
    const shouldSticky = scrollTop > 85;

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
