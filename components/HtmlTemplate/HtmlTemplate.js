import React, { PropTypes } from 'react';

import StyleSheet from './StyleSheet';
import GAScript from './GAScript';
import TypeKitScript from './TypeKitScript';
import MouseFlowScript from './MouseFlowScript';

const HtmlTemplate = (props) => {
  const {
    body,
    title,
    stylesheet,
    trackingID,
  } = props;

  // Some meta tags in head tag will be rendered dynamically in and will be put
  // at the end of the head tag. For those need to be put at the begining of
  // the head tag, should be rendered here.
  //
  // Ref. https://github.com/nfl/react-helmet/issues/239
  //
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, minimum-scale=1.0" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />

        <StyleSheet href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,500italic,700,700italic" />
        <StyleSheet href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <StyleSheet href={stylesheet} />
      </head>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: body }} />

        <TypeKitScript />
        <MouseFlowScript />
        <GAScript trackingID={trackingID} />
        <script src="/main.js" />
      </body>
    </html>
  );
};

HtmlTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  stylesheet: PropTypes.string,
  body: PropTypes.string,
  trackingID: PropTypes.string,
};

export default HtmlTemplate;
