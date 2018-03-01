const ncp = require('ncp');

// Copy static files such as favicon.ico to the output (build) folder
module.exports = () =>
  Promise.all([
    new Promise((resolve, reject) => {
      ncp('static', 'build', err => (err ? reject(err) : resolve()));
    }),
    new Promise((resolve, reject) => {
      ncp('content/assets', 'build/assets', err => (err ? reject(err) : resolve()));
    })
  ]);
