import React, { Component, PropTypes } from 'react';
import Markdown from '../../components/Markdown';

import './GuideTemplate.scss';

class GuideTemplate extends Component {
  get titleComponent() {
    const { title } = this.props;

    if (title && title.length > 0) {
      return <h1>{title}</h1>;
    }

    return undefined;
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
          <div className="menu">
            {/* TODO: add menu here */}
          </div>
          <div className="content">
            {this.titleComponent}
            <Markdown content={content} />
          </div>
        </div>
      </div>
    );
  }
}

GuideTemplate.propTypes = {
  content: PropTypes.string.isRequired,
  sectionName: PropTypes.string.isRequired,
  title: PropTypes.string,
};

GuideTemplate.defaultProps = {
  title: undefined,
  className: '',
};

export default GuideTemplate;
