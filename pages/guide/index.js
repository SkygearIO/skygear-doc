import _ from 'lodash';
import React, { PropTypes } from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';
import TitleBarWithGuideMenu from '../../components/TitleBarWithGuideMenu/TitleBarWithGuideMenu';
import Guide from './Guide';
import Footer from '../../components/Footer/Footer';

import GuideListConfig from '../guideList/config';

import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';

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
  const urlWithoutSlash = guideUrl.slice(-1) === '/' ? guideUrl.slice(0, -1) : guideUrl;
  const lastWordInPath = urlWithoutSlash.substr(urlWithoutSlash.lastIndexOf('/') + 1);
  const { languages } = findCurrentGuide(guideUrl);
  if (languages.indexOf(lastWordInPath) === -1) {
    return '';
  }
  return lastWordInPath;
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
        <Header>
          <HeaderNav
            href="/api-reference/"
            img={apiRefIcon}
            text="API reference"
          />
          <HeaderNav
            href="/support/"
            img={supportIcon}
            text="Support"
          />
        </Header>
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
