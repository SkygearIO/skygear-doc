import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import Markdown from '../../components/Markdown';
import Menu from './Menu';

import './Guide.scss';
import { Window } from '../../lib/BrowserProxy';

class Guide extends Component {
  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
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

  get sectionNameComponent() {
    let classes = [ 'section-name' ];
    if (this.state.sticky) {
      classes.push('sticky-section-name');
    }

    return <h1 className={classes.join(' ')}>{this.props.sectionName}</h1>;
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

    return (
      <Menu
        classNames={classes}
        content={menu || []}
        activeTitle={activeMenu}
      />
    );
  }

  handleScroll() {
    const scrollTop = Window.scrollY || 0;
    this.setState({
      sticky: scrollTop > 85
    });
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
      <div className='Guide-Template'>
        {this.sectionNameComponent}
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
