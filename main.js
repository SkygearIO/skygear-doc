/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import 'babel-polyfill';
import 'whatwg-fetch';

import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { Router, browserHistory } from 'react-router';

import routes from './routes';

class RouterWrapper extends Component {
  render() {
    return (
      <Router
        routes={routes}
        history={browserHistory}
        onUpdate={() => window.scrollTo(0, 0)}
      />
    );
  }
}

ReactDOM.render(<RouterWrapper />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
