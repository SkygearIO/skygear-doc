/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const ReactStaticPlugin = require('react-static-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const pkg = require('./package.json');

const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const useHMR = !!global.HMR; // Hot Module Replacement (HMR)
const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: useHMR,
});

const version = require('./version');

const appConfig = require('./config');

// Webpack configuration (main.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  // The base directory for resolving the entry option
  context: __dirname,

  // The entry point for the bundle
  entry: [
    /* The main entry point of your JavaScript application */
    './main.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, './build'),
    publicPath: '/',
    filename: '[name].js?[hash]',
    chunkFilename: '[id].js?[chunkhash]',
    sourcePrefix: '  ',
  },

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __DEV__: isDebug,
    }),
  ],

  // Options affecting the normal modules
  module: {
    rules: [
      {
        test: /config\.js/,
        loader: `preprocess-loader?version=${version}`,
      },
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './components'),
          path.resolve(__dirname, './pages'),
          path.resolve(__dirname, './utils'),
          path.resolve(__dirname, './content.index.js'),
          path.resolve(__dirname, './main.js'),
          path.resolve(__dirname, './routes.js'),
        ],
        loader: isDebug ?
          `babel-loader?${JSON.stringify(babelConfig)}` :
          `babel-loader?${JSON.stringify(babelConfig)}!strip-loader?strip[]=console.log`,
      },
      {
        test: [/\.scss/, /\.css/],
        loader: isDebug ?
          'style-loader!css-loader!postcss-loader!sass-loader' :
          ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'postcss-loader', 'sass-loader'],
          }),
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.md$/,
        loader: path.resolve(__dirname, './utils/markdown-loader.js'),
      },
      {
        test: /\.(ttf|png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      },
      {
        test: /\.(eot|wav|mp3)$/,
        loader: 'file-loader',
      },
    ],
  },

};

// Optimize the bundle in release (production) mode
if (!isDebug) {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: isVerbose } })); // eslint-disable-line
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
  config.plugins.push(new ExtractTextPlugin({ filename: 'styles.css', allChunks: true }));
  config.plugins.push(
    new ReactStaticPlugin({
      routes: './routes.js',
      template: './components/HtmlTemplate/HtmlTemplate.js',

      // custom props
      stylesheet: '/styles.css',
      gaTrackingID: appConfig.gaTrackingID,
      mouseFlowProjectID: appConfig.mouseFlowProjectID,
    })
  );
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
  config.entry.unshift('webpack-hot-middleware/client?path=/__webpack_hmr');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
  config.plugins.push(new CopyWebpackPlugin([{ from: 'content/assets', to: 'build/assets' }]));
}

module.exports = config;
