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

        const formatedData = frontMatter(data);
        resolve({
          fileName: eachFile,
          attributes: formatedData.attributes,
          content: formatedData.body.replace(/\n/g, ' '),
        });
      });
    }));

  return Promise.all(promises);
};
