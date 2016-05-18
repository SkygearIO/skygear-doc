/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component, PropTypes } from 'react';
import './Link.scss';
import { History } from '../../lib/BrowserProxy';

function isLeftClickEvent(event) {
  return event.button === 0;
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}

class Link extends Component {

  render() {
    const { to, children, ...props } = this.props;
    return <a onClick={Link.handleClick.bind(this)} {...props}>{children}</a>;
  }

}

Link.propTypes = {
  to: PropTypes.string.isRequired,
  state: PropTypes.object,
  onClick: PropTypes.func,
};

Link.handleClick = function (event) {
  let allowTransition = true;
  let clickResult;

  if (this.props && this.props.onClick) {
    clickResult = this.props.onClick(event);
  }

  if (isModifiedEvent(event) || !isLeftClickEvent(event)) {
    return;
  }

  if (clickResult === false || event.defaultPrevented === true) {
    allowTransition = false;
  }

  event.preventDefault();

  if (allowTransition) {
    const link = event.currentTarget;
    const state = this.props && this.props.state || null;
    let nextLocation = this.props && this.props.to || (link.pathname + link.search);

    if (nextLocation.startsWith('http')) {
        window.location = nextLocation;
        return;
    }
    if (nextLocation.startsWith('#')) {
      let { pathname, search } = window.location;
      nextLocation = pathname + search + nextLocation;
    }

    History.pushState(state, nextLocation);
  }
};

export default Link;
