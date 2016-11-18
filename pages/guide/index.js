import React, { PropTypes } from 'react';

import Layout from '../../components/Layout';

import guideRoutes from '../../guideRoutes';

import './index.scss';
import 'highlight.js/styles/default.css';

const Guide = (props) => {
  const {
    route: {
      params: {
        feature,
        guideName,
        language,
      },
    },
  } = props;

  const { title, html } = guideRoutes[feature][language][guideName].markdown;

  return (
    <Layout>
      <h1>{title}</h1>
      <div className="guide" dangerouslySetInnerHTML={{ __html: html }} />
    </Layout>
  );
};

Guide.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      feature: PropTypes.string,
      guideName: PropTypes.string,
      language: PropTypes.string,
    }),
  }),
};

export default Guide;
