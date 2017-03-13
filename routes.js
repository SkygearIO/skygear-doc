/* globals MarkdownFilePaths: false */
// MarkdownFilePaths are created in run.js and passed through webpack

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './pages/home/index';
import GuidePage from './pages/guide/GuidePage';
import GuideList from './pages/guideList/index';
import ApiReference from './pages/apiReference/index';
import Support from './pages/support/index';
import NotFound from './pages/error/index';
import ComingSoon from './pages/comingSoon';
import { pageTitle } from './config';

import './components/Layout.scss';

// does not work when passing './content' as an variable
const req = require.context('./content', true, /^\.\/.*\.md/);

// TODO: render a routing tree with IndexRedirect
const routesForMarkdownFiles = MarkdownFilePaths.map(path => {
  const { title, html } = req(`./${path}`);
  const url = `guides/${path.slice(0, -'.md'.length)}/`;
  return (
    <Route
      key={path}
      path={url}
      component={GuidePage}
      title={pageTitle}
      guideTitle={title}
      docHtml={html}
    />
  );
});

const routes = (
  <Route path="/">
    <IndexRoute title={pageTitle} component={Landing} />
    <Route path="guides/" title={pageTitle} component={GuideList} />
    {routesForMarkdownFiles}
    <Route path="api-reference/" title={pageTitle} component={ApiReference} />
    <Route path="support/" title={pageTitle} component={Support} />
    <Route path="coming-soon/" title={pageTitle} component={ComingSoon} />
    <Route path="404/" title={pageTitle} component={NotFound} />
    <Route path="*" title={pageTitle} component={NotFound} />
  </Route>
);

// Be sure to export the React component so that it can be statically rendered
export default routes;
