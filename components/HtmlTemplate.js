import React, { PropTypes } from 'react';

const Html = (props) => {
  const gaScript = `window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;
    ga('create','${props.trackingID}','auto');ga('send','pageview')`;

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
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: props.body }} />
        <script src="/main.js" />
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
};

export default Html;
