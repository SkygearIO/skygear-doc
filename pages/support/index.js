import React from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import TitleBar from '../../components/TitleBar/TitleBar';
import Support from './Support';
import Footer from '../../components/Footer/Footer';

const SupportPage = () => (
  <div>
    <Banner>
      <Header />
      <TitleBar>
        <h1>Support</h1>
      </TitleBar>
    </Banner>
    <Support />
    <Footer />
  </div>
);

export default SupportPage;
