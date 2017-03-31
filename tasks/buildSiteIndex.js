/* eslint-disable no-console */

const GuidePathGenerator = require('../utils/guidePathGenerator');
const algoliasearch = require('algoliasearch');

const CodeBlockRegex = /```[^`]+```/gm;
const NotAlphaNumericOrDotOrSpaceRegex = /[^0-9a-z\.\s]/gmi; // eslint-disable-line
const MultiSpaceRegex = /\s+/gmi;

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
        content: perFile.content
          .replace(CodeBlockRegex, '')
          .replace(NotAlphaNumericOrDotOrSpaceRegex, ' ')
          .replace(MultiSpaceRegex, ' '),
      }));

  const guideIndex = algoliaClient.initIndex('guides');
  return guideIndex.setSettings({
    searchableAttributes: ['title', 'description', 'content'],
  })
  .then(() => guideIndex.saveObjects(guideIndexData));
};
