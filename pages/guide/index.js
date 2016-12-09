import React, { PropTypes } from 'react';

import Layout from '../../components/Layout';

require('./index.scss');
require('highlight.js/styles/default.css');

const Guide = (props) => {
  const currentRoute = props.routes.slice(-1)[0];

  if (!currentRoute.docHtml || !currentRoute.title) {
    return false;
  }

  const {
    title,
    docHtml,
  } = currentRoute;

  return (
    <Layout>
      <h1>{title}</h1>
      <div className="guide" dangerouslySetInnerHTML={{ __html: docHtml }} />
    </Layout>
  );
};

Guide.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    docHtml: PropTypes.string,
  })),
};

export default Guide;
