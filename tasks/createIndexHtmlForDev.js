const fsp = require('fs-promise');
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const HtmlTemplate = require('../components/HtmlTemplate/HtmlTemplate');

// Create the index page for development only
module.exports = ({ title, dest }) => {
  const renderDocumentToString = props => {
    const markup = renderToStaticMarkup(<HtmlTemplate {...props} />);
    return `<!doctype html>\n${markup}`;
  };

  const html = renderDocumentToString({
    title: title,
    stylesheet: null,
    body: '',
  });

  return fsp.writeFile(dest, html);
};
