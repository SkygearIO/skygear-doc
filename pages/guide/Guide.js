import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Footer from '../../components/Footer/Footer';
import VersionBanner from '../../components/VersionBanner/VersionBanner';

import { canUseDOM, getDocument } from '../../utils/browserProxy';

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
    if (!canUseDOM()) {
      // skip, maybe it is under server rendering
      return;
    }

    const selfDOM = ReactDOM.findDOMNode(this);
    if (!selfDOM) {
      console.warn('Failed to find the DOM.'); // eslint-disable-line
      return;
    }

    const tocAnchors = selfDOM.querySelectorAll('.table-of-contents li a');
    if (tocAnchors.length === 0) {
      console.warn('Cannot find any TOC anchors'); // eslint-disable-line
      return;
    }

    // mark the selected anchor to active
    const currentLocation = getDocument().location.href;
    let foundAnchor = false;
    for (let idx = 0; idx < tocAnchors.length; idx++) {
      const anchor = tocAnchors.item(idx);
      if (anchor.href === currentLocation) {
        anchor.classList.add('active');
        foundAnchor = true;
      } else {
        anchor.classList.remove('active');
      }
    }
    if (!foundAnchor) {
      tocAnchors[0].classList.add('active');
    }
  }

  render() {
    const { title, docHtml, editButtonOnClick } = this.props;
    return (
      <div className="guide">
        <VersionBanner />
        <div className="guide-header">
          <h1>{title}</h1>
          <button onClick={editButtonOnClick}>Edit this page</button>
        </div>
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
  editButtonOnClick: PropTypes.func,
};

Guide.defaultProps = {
  editButtonOnClick: () => null,
};

export default Guide;
