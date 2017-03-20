/* eslint-disable no-console */

const GuidePathGenerator = require('../utils/guidePathGenerator');
const algoliasearch = require('algoliasearch');

module.exports = ({ files, config }) => {
  const { baseUrl, applicationID, apiKey } = config;

  if (!applicationID) {
    return Promise.reject(new Error('Missing Application ID for Algolia'));
  }

  if (!apiKey) {
    return Promise.reject(new Error('Missing API Key for Algolia'));
  }

  const algoliaClient = algoliasearch(applicationID, apiKey);

  const pathGenerator = new GuidePathGenerator({ baseUrl });
  const guideIndexData
    = files.filter((perFile) => (perFile.fileName && perFile.attributes.title))
      .map((perFile) => ({
        objectID: perFile.fileName,
        url: pathGenerator.generate(perFile.fileName),
        title: perFile.attributes.title,
        description: perFile.attributes.description,
        image: perFile.attributes.image,
      }));

  const guideIndex = algoliaClient.initIndex('guides');
  return guideIndex.setSettings({
    searchableAttributes: ['url', 'title', 'description'],
  })
  .then(() => guideIndex.saveObjects(guideIndexData));
};
