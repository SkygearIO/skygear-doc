import _ from 'lodash';

import * as PathDigester from './guidePathDigester';

export function search(path, database) {
  const target = PathDigester.digest(path);

  const foundGuide = _.find(database, guide => {
    const { baseUrl, languages } = guide;
    const allLanguageGuides = languages
      .map(language => `${baseUrl}${language}`)
      .map(PathDigester.digest);

    return _.filter(allLanguageGuides, languageGuide => (
      languageGuide.section === target.section &&
      languageGuide.name === target.name
    )).length > 0;
  });

  return foundGuide;
}
