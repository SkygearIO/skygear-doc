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

const glob = require('glob');
const join = require('path').join;
const del = require('del');
const ncp = require('ncp');
const mkdirp = require('mkdirp');
const webpack = require('webpack');

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

//
// Clean up the output directory
// -----------------------------------------------------------------------------
tasks.set('clean', () =>
  del(['build/*', '!build/.git'], { dot: true })
  .then(() => mkdirp('build'))
);

//
// Copy static files such as favicon.ico to the output (build) folder
// -----------------------------------------------------------------------------
tasks.set('copy', () =>
  new Promise((resolve, reject) => {
    ncp('static', 'build', err => (err ? reject(err) : resolve()));
  })
);

//
// Bundle JavaScript, CSS and image files with Webpack
// -----------------------------------------------------------------------------
tasks.set('readMarkdownFiles', () =>
  new Promise((resolve, reject) => {
    const markdownDir = join(__dirname, appConfig.contentDir);
    glob('**/*.md', { cwd: markdownDir }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  })
);

//
// Bundle JavaScript, CSS and image files with Webpack
// -----------------------------------------------------------------------------
tasks.set('bundle', (extraParams) => {
  const webpackConfig = require('./webpack.config');

  const plugin = new webpack.DefinePlugin(extraParams);
  webpackConfig.plugins.push(plugin);

  return new Promise((resolve, reject) => {
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(webpackConfig.stats));
        resolve();
      }
    });
  });
});

//
// Build website into a distributable format
// -----------------------------------------------------------------------------
tasks.set('build', () => {
  global.DEBUG = process.argv.includes('--debug') || false;
  return Promise.resolve()
    .then(() => run('clean'))
    .then(() => run('copy'))
    .then(() => run('readMarkdownFiles'))
    .then(files => run('bundle', { MarkdownFilePaths: JSON.stringify(files) }));
});

//
// Build website and launch it in a browser for testing (default)
// -----------------------------------------------------------------------------
tasks.set('start', () => {
  let count = 0;
  global.HMR = !process.argv.includes('--no-hmr'); // Hot Module Replacement (HMR)
  return run('clean')
    .then(() => run('copy'))
    .then(() => run('readMarkdownFiles'))
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
          bs.init({
            port: process.env.PORT || 3000,
            ui: { port: Number(process.env.PORT || 3000) + 1 },
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
run(/^\w/.test(process.argv[2] || '') ? process.argv[2] : 'start' /* default */);
