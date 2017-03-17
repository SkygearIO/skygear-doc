const del = require('del');
const mkdirp = require('mkdirp');

// Clean up the output directory
module.exports = () =>
  del(
    ['build/*', '!build/.git'],
    { dot: true }
  ).then(() => mkdirp('build'));
