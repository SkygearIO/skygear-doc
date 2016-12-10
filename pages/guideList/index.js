import React from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import TitleBar from '../../components/TitleBar/TitleBar';
import GuideList from './GuideList';
import Footer from '../../components/Footer/Footer';

const GuideListPage = () => (
  <div>
    <Banner>
      <Header />
      <TitleBar>
        <h1>Guides Overview</h1>
      </TitleBar>
    </Banner>
    <GuideList />
    <Footer />
  </div>
);

export default GuideListPage;
