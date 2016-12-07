import React from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import TitleBar from '../../components/TitleBar/TitleBar';

const GuideList = () => (
  <div>
    <Banner>
      <Header />
      <TitleBar>
        <h1>Guides Overview</h1>
      </TitleBar>
    </Banner>
  </div>
);

export default GuideList;
