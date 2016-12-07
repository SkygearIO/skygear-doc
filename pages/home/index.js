import React from 'react';

import Banner from './Banner';
import Header from '../../components/Header/Header';
import QuickStart from './QuickStart';
import Buttons from './Buttons';
import ButtonsPlaceholder from './ButtonsPlaceholder';
import Contributing from './Contributing';
import Footer from '../../components/Footer/Footer';

const IndexPage = function () {
  return (
    <div>
      <Banner>
        <Header />
        <QuickStart />
        <Buttons />
      </Banner>
      <ButtonsPlaceholder />
      <Contributing />
      <Footer />
    </div>
  );
};

export default IndexPage;
