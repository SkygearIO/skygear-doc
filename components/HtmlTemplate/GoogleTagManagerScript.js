import React, { PropTypes } from 'react';

const GoogleTagManagerScript = ({ trackingID }) => {
  if (!trackingID) {
    return null;
  }

  const tagScript = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-N6NXL5K');`;

  return (
    <section>
      <script dangerouslySetInnerHTML={{ __html: tagScript }} />
    </section>
  );
};

GoogleTagManagerScript.propTypes = {
  trackingID: PropTypes.string,
};

export default GoogleTagManagerScript;
