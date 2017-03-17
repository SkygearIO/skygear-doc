/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable no-console, global-require */


const webpack = require('webpack');
const path = require('path');
const appConfig = require('./config');

const tasks = new Map(); // The collection of automation tasks ('clean', 'build', etc.)

function run(task, params) {
  const start = new Date();
  console.log(`Starting '${task}'...`);
  return new Promise((resolve, reject) => {
    tasks.get(task)(params).then(result => {
      console.log(`Finished '${task}' after ${new Date().getTime() - start.getTime()}ms`);
      resolve(result);
    }, err => {
      console.error(err.stack);
      reject();
    });
  });
}

tasks.set('copy', require('./tasks/copy'));
tasks.set('clean', require('./tasks/clean'));
tasks.set('bundle', require('./tasks/bundle'));
tasks.set('readMarkdownFiles', require('./tasks/readMarkdownFiles'));
tasks.set('createIndexHtmlForDev', require('./tasks/createIndexHtmlForDev'));

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
tasks.set('build', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  return Promise.resolve()
    .then(() => run('clean'))
    .then(() => run('copy'))
    .then(() => run('readMarkdownFiles', {
      src: path.join(__dirname, appConfig.contentDir),
    }))
    .then(files => run(
      'bundle',
      {
        config: require('./webpack.config'),
        extra: {
          MarkdownFilePaths: JSON.stringify(files),
        },
      },
    ));
});

//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------
tasks.set('default', () => {
  let count = 0;
  global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
  return run('clean')
    .then(() => run('copy'))
    .then(() => run('createIndexHtmlForDev', {
      title: appConfig.pageTitle,
      dest: 'build/index.html',
    }))
    .then(() => run('readMarkdownFiles', {
      src: path.join(__dirname, appConfig.contentDir),
    }))
    .then((files) => new Promise(resolve => {
      const bs = require('browser-sync').create();
      const webpackConfig = require('./webpack.config');

      const plugin = new webpack.DefinePlugin({
        MarkdownFilePaths: JSON.stringify(files),
      });
      webpackConfig.plugins.push(plugin);

      const compiler = webpack(webpackConfig);
      // Node.js middleware that compiles application in watch mode with HMR support
      // http://webpack.github.io/docs/webpack-dev-middleware.html
      const webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        stats: webpackConfig.stats,
      });
      compiler.plugin('done', () => {
        // Launch Browsersync after the initial bundling is complete
        // For more information visit https://browsersync.io/docs/options
        if (++count === 1) {
          const port = parseInt(process.env.PORT, 10) || 3000;
          const uiPort = parseInt(process.env.UI_PORT, 10) || port + 1;
          bs.init({
            port: port,
            ui: { port: uiPort },
            server: {
              baseDir: 'build',
              middleware: [
                webpackDevMiddleware,
                require('webpack-hot-middleware')(compiler),
                require('connect-history-api-fallback')(),
              ],
            },
          }, resolve);
        }
      });
    }));
});

// Execute the specified task or default one. E.g.: node run build
run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'default');
