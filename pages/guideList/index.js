import React from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import HeaderNav from '../../components/Header/Nav/Nav';
import TitleBar from '../../components/TitleBar/TitleBar';
import GuideList from './GuideList';

import GuideSearchWidget from '../../components/GuideSearchWidget/GuideSearchWidget';

import apiRefIcon from '../../static/images/icn-api-ref.svg';
import supportIcon from '../../static/images/icn-support.svg';

import './style.scss';

const GuideListPage = () => (
  <div className="guide-list-page">
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
      <TitleBar>
        <h1 className="guide-list-title">Guides Overview</h1>
        <GuideSearchWidget />
      </TitleBar>
    </Banner>
    <GuideList />
  </div>
);

export default GuideListPage;
