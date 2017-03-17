const ncp = require('ncp');

// Copy static files such as favicon.ico to the output (build) folder
module.exports = () =>
  new Promise((resolve, reject) => {
    ncp('static', 'build', err => (err ? reject(err) : resolve()));
  });
