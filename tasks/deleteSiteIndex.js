const algoliasearch = require('algoliasearch');

module.exports = ({ config }) => {
  const { applicationID, apiKey } = config;

  if (!applicationID) {
    return Promise.reject(new Error('Missing Application ID for Algolia'));
  }

  if (!apiKey) {
    return Promise.reject(new Error('Missing API Key for Algolia'));
  }

  return algoliasearch(applicationID, apiKey).deleteIndex('guides');
};
