/* eslint-disable no-console */
const crypto = require('crypto');

const GuidePathGenerator = require('../utils/guidePathGenerator');
const GuidePathDigester = require('../utils/guidePathDigester');
const algoliasearch = require('algoliasearch');

const NotAlphaNumericOrDotOrSpaceRegex = /[^0-9a-z\.\s]/gmi; // eslint-disable-line
const MultiSpaceRegex = /\s+/gmi;

module.exports = ({ files, sections, config }) => {
  const { baseUrl, applicationID, apiKey, indexName } = config;

  if (!applicationID) {
    return Promise.reject(new Error('Missing Application ID for Algolia'));
  }

  if (!apiKey) {
    return Promise.reject(new Error('Missing API Key for Algolia'));
  }

  const algoliaClient = algoliasearch(applicationID, apiKey);

  const absolutePathGenerator = new GuidePathGenerator({ baseUrl });
  const relativePathGenerator = new GuidePathGenerator({ baseUrl: 'guides/' });
  const guideIndexData
    = files.filter((perFile) => (perFile.fileName && perFile.attributes.title))
      .map((perFile) => {
        const objectIDHasher = crypto.createHash('sha256');
        objectIDHasher.update(perFile.fileName);

        const relativePath = relativePathGenerator.generate(perFile.fileName);
        const digest = GuidePathDigester.digest(relativePath);
        const foundSection = sections[digest.section];

        if (!foundSection) {
          console.warn(`Failed to find section for ${relativePath}`);
        }

        return {
          objectID: objectIDHasher.digest('hex').substr(0, 12),
          url: absolutePathGenerator.generate(perFile.fileName),
          title: perFile.attributes.title,
          description: perFile.attributes.description,
          image: perFile.attributes.image,
          content: perFile.content
            .replace(NotAlphaNumericOrDotOrSpaceRegex, ' ')
            .replace(MultiSpaceRegex, ' '),
          meta: {
            section: foundSection && {
              id: foundSection.id,
              name: foundSection.name,
            },
            platform: digest.language,
          },
        };
      });

  const guideIndex = algoliaClient.initIndex(indexName || 'guides');
  return guideIndex.setSettings({
    searchableAttributes: ['title', 'description', 'content'],
  })
  .then(() => guideIndex.saveObjects(guideIndexData));
};
