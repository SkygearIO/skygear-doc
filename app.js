/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { canUseDOM } from 'fbjs/lib/ExecutionEnvironment';
import { History } from './lib/Location';
import Layout from './components/Layout';

const routes = {}; // Auto-generated on build. See tools/lib/routes-loader.js

const route = async (path, callback) => {
  if (path.endsWith('/')) {
    path = path.substr(0, path.lastIndexOf('/'));
  }

  if (path === '') {
    path = '/';
  }

  const handler = routes[path] || routes['/404'];
  const component = await handler();
  await callback(<Layout>{React.createElement(component)}</Layout>);
};

function run() {
  const container = document.getElementById('app');
  const pageLoader = document.getElementById('page-loader');
  History.listen(location => {
    route(location.pathname, async (component) => {
        ReactDOM.render(component, container, () => {
          pageLoader.style.display = 'none';
          if (location.hash.length > 1) {
            const hashName = location.hash.substr(1);
            let elem = document.getElementsByName(hashName)[0];
            if (elem) {
              window.scrollBy(0, elem.getBoundingClientRect().top);
            }
          } else {
            window.scrollTo(0, 0);
          }
          // Track the page view event via Google Analytics
          window.ga('send', 'pageview');
        });
    });
  });
}

if (canUseDOM) {
// Run the application when both DOM is ready
// and page content is loaded
  if (window.addEventListener) {
    window.addEventListener('DOMContentLoaded', run);
  } else {
    window.attachEvent('onload', run);
  }
}

export default { route, routes };
