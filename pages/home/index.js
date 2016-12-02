import React from 'react';

import Banner from './Banner';
import Header from '../../components/Header/Header';
import QuickStart from './QuickStart';
import Buttons from './Buttons';

const IndexPage = function () {
  return (
    <div>
      <Banner>
        <Header />
        <QuickStart />
        <Buttons />
      </Banner>
    </div>
  );
};

export default IndexPage;
