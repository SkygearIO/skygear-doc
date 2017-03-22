const fs = require('fs');
const path = require('path');
const frontMatter = require('front-matter');

module.exports = ({ files, cwd }) => {
  const promises = files
    .map((eachFile) => new Promise((resolve, reject) => {
      const eachFullPath = path.join(cwd, eachFile);
      fs.readFile(eachFullPath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve({
          fileName: eachFile,
          attributes: frontMatter(data).attributes,
        });
      });
    }));

  return Promise.all(promises);
};
