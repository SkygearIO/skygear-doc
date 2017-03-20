import React, { PropTypes } from 'react';

const GAScript = ({ trackingID }) => {
  if (!trackingID) {
    return null;
  }

  const gaScript = `
    window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
    ga('create','${trackingID}','auto');ga('send','pageview')`;

  return (
    <section>
      <script src="https://www.google-analytics.com/analytics.js" async defer />
      <script dangerouslySetInnerHTML={{ __html: gaScript }} />
    </section>
  );
};

GAScript.propTypes = {
  trackingID: PropTypes.string,
};

export default GAScript;
