import React, { PropTypes } from 'react';

import PageMeta from '../../components/PageMeta/PageMeta';

const Container = ({ children }) => (
  <main>
    <PageMeta
      description="Skygear Docs are guides, API reference and sample projects
      to help developers get started with Skygear iOS, Android and Javascript SDK."
      ogTitle="Documentations - Skygear"
      ogDescription="Skygear Docs are guides, API reference and sample projects
      to help developers get started with Skygear iOS, Android and Javascript SDK."
      ogImage="https://docs.skygear.io/static/images/skygear-og-img.png"
      twitterCard="summary"
      twitterSite="@skygeario"
      twitterCreator="@skygeario"
    />
    {children}
  </main>
);

Container.propTypes = {
  children: PropTypes.node,
};

export default Container;
