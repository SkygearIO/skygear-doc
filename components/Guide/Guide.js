import React, { Component, PropTypes } from 'react';
import Markdown from '../../components/Markdown';
import Menu from './Menu';

import './Guide.scss';

class Guide extends Component {
  get titleComponent() {
    const { title } = this.props;

    if (title && title.length > 0) {
      return <h1>{title}</h1>;
    }

    return undefined;
  }

  get menuComponent() {
    const {
      menu,
      activeMenu,
    } = this.props;

    if (!menu) {
      return undefined;
    }

    return (
      <Menu
        className="menu"
        content={menu || []}
        activeTitle={activeMenu}
      />
    );
  }

  render() {
    const {
      content,
      sectionName,
      className,
    } = this.props;

    return (
      <div className={'Guide-Template ' + className}>
        <h1>{sectionName}</h1>
        <hr />
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
  className: PropTypes.string,
  activeMenu: PropTypes.string,
};

Guide.defaultProps = {
  className: '',
};

export default Guide;
