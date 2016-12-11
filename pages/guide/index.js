import React, { PropTypes } from 'react';

import Banner from '../../components/Banner/Banner';
import Header from '../../components/Header/Header';
import TitleBar from '../../components/TitleBar/TitleBar';
import Guide from './Guide';
import Footer from '../../components/Footer/Footer';

const GuidePage = (props) => {
  const currentRoute = props.routes.slice(-1)[0];

  if (!currentRoute.docHtml || !currentRoute.title) {
    return false;
  }

  const {
    title,
    docHtml,
  } = currentRoute;

  return (
    <div>
      <Banner>
        <Header />
        <TitleBar>
          <h1>Guides</h1>
        </TitleBar>
      </Banner>
      <Guide title={title} docHtml={docHtml} />
      <Footer />
    </div>
  );
};

GuidePage.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    docHtml: PropTypes.string,
  })),
};

export default GuidePage;
