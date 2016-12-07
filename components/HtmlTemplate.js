import React, { PropTypes } from 'react';

const Html = (props) => {
  const gaScript = `window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
    ga('create','${props.trackingID}','auto');ga('send','pageview')`;
  const typekitScript = 'try{Typekit.load({ async: true });}catch(e){}';

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <title>{props.title}</title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,500italic,700,700italic" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="stylesheet" href={`/${props.stylesheet}`} />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <script src="https://use.typekit.net/oof1hhz.js"></script>
        <script dangerouslySetInnerHTML={{ __html: typekitScript }} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: props.body }} />
        {props.trackingID &&
          <script dangerouslySetInnerHTML={{ __html: gaScript }} />
        }
        <script src="https://www.google-analytics.com/analytics.js" async defer></script>
      </body>
    </html>
  );
};

Html.propTypes = {
  trackingID: PropTypes.string,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  bundle: PropTypes.string.isRequired,
  stylesheet: PropTypes.string.isRequired,
};

export default Html;
