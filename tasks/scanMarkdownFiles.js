const glob = require('glob');

// read all markdown files under the content directory
module.exports = ({ src }) =>
  new Promise((resolve, reject) => {
    glob('**/*.md', { cwd: src }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
