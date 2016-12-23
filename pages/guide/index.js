import _ from 'lodash';
import React, { PropTypes } from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import TitleBarWithGuideMenu from '../../components/TitleBarWithGuideMenu/TitleBarWithGuideMenu';
import Guide from './Guide';
import Footer from '../../components/Footer/Footer';

import GuideListConfig from '../guideList/config';

function findCurrentGuide(guideUrl) {
  const allGuides = _.flatMap(GuideListConfig.sections, section => section.guides);
  const currentGuide = _.find(allGuides, guide => {
    const { baseUrl, languages } = guide;
    const languageUrls = languages.map(language => `${baseUrl}${language}/`);
    return languageUrls.indexOf(`/${guideUrl}`) >= 0;
  });

  if (_.isEmpty(currentGuide)) {
    return false;
  }

  return currentGuide;
}

function findCurrentLanguage(guideUrl) {
  const urlWithoutTrailingSlash = guideUrl.slice(-1) === '/' ? guideUrl.slice(0, -1) : guideUrl;
  return urlWithoutTrailingSlash.substr(urlWithoutTrailingSlash.lastIndexOf('/') + 1);
}

function findLanguageOptions(guideUrl) {
  const currentGuide = findCurrentGuide(guideUrl);
  if (!currentGuide) {
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
    guideTitle,
    docHtml,
  } = currentRoute;

  const currentGuide = findCurrentGuide(path);
  const languageOptions = findLanguageOptions(path);
  const language = findCurrentLanguage(path);

  return (
    <div>
      <Banner>
        <Header />
        <TitleBarWithGuideMenu
          currentGuide={currentGuide}
          currentLanguage={language}
        />
      </Banner>
      <Guide
        title={guideTitle}
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
    language: PropTypes.string,
    guideTtle: PropTypes.string,
    docHtml: PropTypes.string,
  })),
};

export default GuidePage;
