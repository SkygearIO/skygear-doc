import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';
import TitleBarWithMenuButton from '../../components/TitleBarWithMenuButton/TitleBarWithMenuButton';
import Guide from './Guide';
import GuidesMenu from '../../components/GuidesMenu/GuidesMenu';

import GuideListConfig from '../guideList/config';

import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';

import './GuidePage.scss';

// TODO: subtract these searching methods and add test cases
function findCurrentGuide(guideUrl) {
  const allGuides = _.flatMap(GuideListConfig.sections, section => section.guides);
  const currentGuide = _.find(allGuides, guide => {
    const { baseUrl, languages } = guide;
    const languageUrls = languages.map(language => `${baseUrl}${language}/`);
    return languageUrls.indexOf(`/${guideUrl}`) >= 0;
  });

  return currentGuide;
}

function findCurrentLanguage(guideUrl) {
  const urlWithoutSlash = guideUrl.slice(-1) === '/' ? guideUrl.slice(0, -1) : guideUrl;
  const lastWordInPath = urlWithoutSlash.substr(urlWithoutSlash.lastIndexOf('/') + 1);
  const currentGuide = findCurrentGuide(guideUrl);
  if (!currentGuide || currentGuide.languages.indexOf(lastWordInPath) === -1) {
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

class GuidePage extends Component {
  constructor(props) {
    super(props);

    this.toggleMenuState = this.toggleMenuState.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    this.debouncedSetMenuShouldShowInMobile = _.debounce(
      this.debouncedSetMenuShouldShowInMobile.bind(this), 100);

    this.state = {
      menuShouldShowInMobile: false,
    };
  }

  componentWillMount() {
    try {
      document.body.addEventListener('click', this.onBodyClick);
    } catch (e) {
      // skip add event listener
    }
  }

  componentWillUnmount() {
    try {
      document.body.removeEventListener('click', this.onBodyClick);
    } catch (e) {
      // skip remove event listener
    }
  }

  onBodyClick(event) {
    const guideMenu = this.refs['guide-menu'];
    const guideMenuDOM = ReactDOM.findDOMNode(guideMenu);

    if (guideMenuDOM && !guideMenuDOM.contains(event.target)) {
      this.debouncedSetMenuShouldShowInMobile(false);
    }
  }

  toggleMenuState() {
    const { menuShouldShowInMobile } = this.state;
    this.debouncedSetMenuShouldShowInMobile(!menuShouldShowInMobile);
  }

  debouncedSetMenuShouldShowInMobile(shouldShow) {
    this.setState({
      menuShouldShowInMobile: shouldShow,
    });
  }

  render() {
    const { routes } = this.props;
    const { menuShouldShowInMobile } = this.state;

    const currentRoute = routes.slice(-1)[0];

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
      <div className="guide-page">
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
          <TitleBarWithMenuButton
            onMenuButtonClick={this.toggleMenuState}
          />
        </Banner>
        <GuidesMenu
          ref="guide-menu"
          currentGuide={currentGuide}
          currentLanguage={language}
          shouldShowInMobile={menuShouldShowInMobile}
        />
        <Guide
          title={guideTitle}
          docHtml={docHtml}
          languageOptions={languageOptions}
          language={language}
        />
      </div>
    );
  }
}

GuidePage.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    language: PropTypes.string,
    guideTtle: PropTypes.string,
    docHtml: PropTypes.string,
  })),
};

export default GuidePage;
