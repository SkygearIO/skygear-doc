import _ from 'lodash';
import React, { PropTypes } from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import TitleBarWithGuideMenu from './TitleBarWithGuideMenu';
import Guide from './Guide';
import Footer from '../../components/Footer/Footer';

import GuideListConfig from '../guideList/config';

function findCurrentLanguage(guideUrl) {
  const urlWithoutTrailingSlash = guideUrl.slice(-1) === '/' ? guideUrl.slice(0, -1) : guideUrl;
  return urlWithoutTrailingSlash.substr(urlWithoutTrailingSlash.lastIndexOf('/') + 1);
}

function findLanguageOptions(guideUrl) {
  const allGuides = _.flatMap(GuideListConfig.sections, section => section.guides);
  const currentGuide = _.find(allGuides, guide => {
    const { baseUrl, languages } = guide;
    const languageUrls = languages.map(language => `${baseUrl}${language}/`);
    return languageUrls.indexOf(`/${guideUrl}`) >= 0;
  });

  if (_.isEmpty(currentGuide)) {
    console.error(`Warnings: cannot find spec for guide ${guideUrl}`);
    return [];
  }

  return currentGuide.languages.map(language => ({
    language: language,
    url: `${currentGuide.baseUrl}${language}/`,
  }));
}

const GuidePage = (props) => {
  const currentRoute = props.routes.slice(-1)[0];

  if (!currentRoute.docHtml || !currentRoute.title) {
    return false;
  }

  const {
    path,
    title,
    docHtml,
  } = currentRoute;

  const languageOptions = findLanguageOptions(path);
  const language = findCurrentLanguage(path);

  return (
    <div>
      <Banner>
        <Header />
        <TitleBarWithGuideMenu />
      </Banner>
      <Guide
        title={title}
        docHtml={docHtml}
        languageOptions={languageOptions}
        language={language}
      />
      <Footer />
    </div>
  );
};

GuidePage.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    docHtml: PropTypes.string,
  })),
};

export default GuidePage;
