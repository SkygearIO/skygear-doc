import React, { PropTypes } from 'react';

const StyleSheet = ({ href }) => {
  if (!href) {
    return null;
  }

  return <link rel="stylesheet" href={href} />;
};

StyleSheet.propTypes = {
  href: PropTypes.string,
};

export default StyleSheet;
