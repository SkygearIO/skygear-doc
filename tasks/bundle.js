/* eslint-disable no-console */

const webpack = require('webpack');

// Bundle JavaScript, CSS and image files with Webpack
module.exports = ({ config, extra }) => {
  const extraPlugin = new webpack.DefinePlugin(extra);
  config.plugins.push(extraPlugin);

  return new Promise((resolve, reject) => {
    webpack(config).run((err, stats) => {
      if (err) {
        reject(err);
      } else {
        console.log(stats.toString(config.stats));
        resolve();
      }
    });
  });
};
