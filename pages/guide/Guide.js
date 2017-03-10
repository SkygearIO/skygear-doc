import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Footer from '../../components/Footer/Footer';

import './Guide.scss';
import 'highlight.js/styles/xcode.css';

class Guide extends Component {
  constructor(props) {
    super(props);

    this.updateTocAnchors = _.throttle(this.updateTocAnchors.bind(this), 500);
  }

  componentDidMount() {
    this.updateTocAnchors();
  }

  componentDidUpdate() {
    this.updateTocAnchors();
  }

  updateTocAnchors() {
    const selfDOM = ReactDOM.findDOMNode(this);
    if (!selfDOM) {
      console.warn('Failed to find the DOM.');
      return;
    }

    const tocAnchors = selfDOM.querySelectorAll('.table-of-contents li a');
    if (tocAnchors.length === 0) {
      console.warn('Cannot find any TOC anchors');
      return;
    }

    let currentLocation;
    try {
      currentLocation = document.location.href;
    } catch (e) {
      // skip, maybe it is under server rendering
      return;
    }

    // mark the selected anchor to active
    let foundAnchor = false;
    tocAnchors.forEach((anchor) => {
      if (anchor.href === currentLocation) {
        anchor.classList.add('active');
        foundAnchor = true;
      } else {
        anchor.classList.remove('active');
      }
    });
    if (!foundAnchor) {
      tocAnchors[0].classList.add('active');
    }
  }

  render() {
    const { title, docHtml } = this.props;
    return (
      <div className="guide">
        <h1 className="guide-header">{title}</h1>
        <div
          className="guide-content"
          dangerouslySetInnerHTML={{ __html: docHtml }}
        />
        <Footer />
      </div>
    );
  }
}

Guide.propTypes = {
  title: PropTypes.string,
  docHtml: PropTypes.string,
};

export default Guide;
