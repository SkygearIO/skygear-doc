import React, { PropTypes } from 'react';

import Layout from '../../components/Layout';

require('./index.scss');
require('highlight.js/styles/default.css');

const Guide = (props) => {
  const currentRoute = props.routes.slice(-1)[0];

  if (!currentRoute.markdown) {
    return false;
  }

  const {
    markdown: {
      title,
      html,
    },
  } = currentRoute;

  return (
    <Layout>
      <h1>{title}</h1>
      <div className="guide" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

Guide.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.shape({
    markdown: PropTypes.object,
  })),
};

export default Guide;
