import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import PageMeta from '../../components/PageMeta/PageMeta';
import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';
import TitleBarWithMenuButton from '../../components/TitleBarWithMenuButton/TitleBarWithMenuButton';
import Guide from './Guide';
import GuidesMenu from '../../components/GuidesMenu/GuidesMenu';

import * as ContributePage from '../../pages/contribute';

import ContentIndex from '../../content.index';

import * as GuidePathDigester from '../../utils/guidePathDigester';
import * as GuideContentSearcher from '../../utils/guideContentSearcher';
import { getWindow } from '../../utils/browserProxy';

import { guideEditBaseUrl } from '../../config';

import guidesIcon from '../../static/images/icn-guides.svg';
import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';

import './GuidePage.scss';

const ContentGuideDatabase = _.flatMap(ContentIndex.sections, section => section.guides);

class GuidePage extends Component {
  constructor(props) {
    super(props);

    this.toggleMenuState = this.toggleMenuState.bind(this);
    this.onBodyClick = this.onBodyClick.bind(this);
    this.onGuideEditButtonClick = this.onGuideEditButtonClick.bind(this);
    this.debouncedSetMenuShouldShowInMobile = _.debounce(
      this.debouncedSetMenuShouldShowInMobile.bind(this), 100);

    this.state = {
      menuShouldShowInMobile: false,
    };
  }

  componentDidMount() {
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

  onGuideEditButtonClick() {
    const { routes, router } = this.props;
    const currentRoute = routes.slice(-1)[0];
    const { filePath } = currentRoute;
    if (!filePath) {
      return;
    }

    const Window = getWindow();
    if (Window.localStorage.getItem(ContributePage.LocalStorageKey) === 'true') {
      Window.location = `${guideEditBaseUrl}${filePath}`;
      return;
    }

    router.push({
      pathname: '/contribute/',
      query: {
        file: filePath,
      },
    });
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
      return null;
    }

    const {
      path,
      guideTitle,
      docHtml,
    } = currentRoute;

    const currentGuide = GuideContentSearcher.search(path, ContentGuideDatabase);
    const currentLanguage = GuidePathDigester.digest(path).language;

    if (!currentGuide) {
      console.warn(`Cannot find guide for path: ${path}`); // eslint-disable-line
      return null;
    }

    return (
      <div className="guide-page">
        <PageMeta
          ogTitle={currentRoute.guideTitle}
          ogDescription={currentRoute.guideDescription}
          ogImage={currentRoute.guideImage}
        />
        <Header>
          <HeaderNav
            img={guidesIcon}
            text="Guides"
            active
          />
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
        <GuidesMenu
          ref="guide-menu"
          contentIndex={ContentIndex}
          currentGuide={currentGuide}
          currentLanguage={currentLanguage}
          shouldShowInMobile={menuShouldShowInMobile}
        />
        <Guide
          key={`guide:${currentGuide.baseUrl + (currentLanguage || '')}`}
          title={guideTitle}
          docHtml={docHtml}
          editButtonOnClick={this.onGuideEditButtonClick}
        />
      </div>
    );
  }
}

GuidePage.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    filePath: PropTypes.string,
    path: PropTypes.string,
    title: PropTypes.string,
    guideTtle: PropTypes.string,
    guideDescription: PropTypes.string,
    guideImage: PropTypes.string,
    docHtml: PropTypes.string,
  })),
  router: PropTypes.object,
};

export default GuidePage;
