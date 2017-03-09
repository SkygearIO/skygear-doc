import _ from 'lodash';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';
import TitleBarWithMenuButton from '../../components/TitleBarWithMenuButton/TitleBarWithMenuButton';
import Guide from './Guide';
import GuidesMenu from '../../components/GuidesMenu/GuidesMenu';

import ContentIndex from '../../content.index';

import * as GuidePathDigester from '../../utils/guidePathDigester';
import * as GuideContentSearcher from '../../utils/guideContentSearcher';

import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';

import './GuidePage.scss';

const ContentGuideDatabase = _.flatMap(ContentIndex.sections, section => section.guides);

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

    const currentGuide = GuideContentSearcher.search(path, ContentGuideDatabase);
    const currentLanguage = GuidePathDigester.digest(path).language;

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
          currentLanguage={currentLanguage}
          shouldShowInMobile={menuShouldShowInMobile}
        />
        <Guide
          title={guideTitle}
          docHtml={docHtml}
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
