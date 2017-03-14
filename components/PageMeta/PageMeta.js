import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';

const PageMeta = (props) => {
  const {
    description,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard,
    twitterSite,
    twitterCreator,
  } = props;

  const meta = [];

  if (description) {
    meta.push({ name: 'description', content: description });
  }

  if (ogTitle) {
    meta.push({ property: 'og:title', content: ogTitle });
  }

  if (ogDescription) {
    meta.push({ property: 'og:description', content: ogDescription });
  }

  if (ogImage) {
    meta.push({ property: 'og:image', content: ogImage });
  }

  if (twitterCard) {
    meta.push({ name: 'twitter:card', content: twitterCard });
  }

  if (twitterSite) {
    meta.push({ name: 'twitter:site', content: twitterSite });
  }

  if (twitterCreator) {
    meta.push({ name: 'twitter:creator', content: twitterCreator });
  }

  if (meta.length === 0) {
    return null;
  }

  return <Helmet meta={meta} />;
};

PageMeta.propTypes = {
  description: PropTypes.string,
  ogTitle: PropTypes.string,
  ogDescription: PropTypes.string,
  ogImage: PropTypes.string,
  twitterCard: PropTypes.string,
  twitterSite: PropTypes.string,
  twitterCreator: PropTypes.string,
};

export default PageMeta;
