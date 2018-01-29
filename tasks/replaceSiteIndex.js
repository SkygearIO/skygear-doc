const algoliasearch = require('algoliasearch');

module.exports = ({ config }) => {
  const { applicationID, apiKey, srcIndex, destIndex } = config;

  if (!applicationID) {
    return Promise.reject(new Error('Missing Application ID for Algolia'));
  }

  if (!apiKey) {
    return Promise.reject(new Error('Missing API Key for Algolia'));
  }

  return algoliasearch(applicationID, apiKey).moveIndex(srcIndex, destIndex);
};
