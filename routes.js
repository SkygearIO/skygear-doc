/* globals MarkdownFilePaths: false */
// MarkdownFilePaths are created in run.js and passed through webpack

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './pages/home/index';
import Guide from './pages/guide/index';
import GuideList from './pages/guideList/index';
import GetStartedIos from './pages/getStarted/ios';
import GetStartedAndroid from './pages/getStarted/android';
import GetStartedJs from './pages/getStarted/js';
import ApiReference from './pages/apiReference/index';
import Support from './pages/support/index';
import NotFound from './pages/error/index';
import ComingSoon from './pages/comingSoon';

import './components/Layout.scss';

// does not work when passing './content' as an variable
const req = require.context('./content', true, /^\.\/.*\.md/);

const pageTitle = 'Skygear Documentation';

const routesForMarkdownFiles = MarkdownFilePaths.map(path => {
  const { title, html } = req(`./${path}`);
  const url = `guide/${path.slice(0, -'.md'.length)}/`;
  console.log(`[Route generator] file ${path} -> url ${url}`);
  return (
    <Route
      key={path}
      path={url}
      component={Guide}
      title={pageTitle}
      guideTitle={title}
      docHtml={html}
    />
  );
});

const routes = (
  <Route path="/">
    <IndexRoute title={pageTitle}component={Landing} />
    <Route path="guides/" title={pageTitle} component={GuideList} />
    <Route path="guide/get-started/ios/" title={pageTitle} component={GetStartedIos} />
    <Route path="guide/get-started/android/" title={pageTitle} component={GetStartedAndroid} />
    <Route path="guide/get-started/js/" title={pageTitle} component={GetStartedJs} />
    {routesForMarkdownFiles}
    <Route path="api-reference/" title={pageTitle} component={ApiReference} />
    <Route path="support/" title={pageTitle} component={Support} />
    <Route path="coming-soon/" title={pageTitle} component={ComingSoon} />
    <Route path="*" title={pageTitle} component={NotFound} />
  </Route>
);

// Be sure to export the React component so that it can be statically rendered
export default routes;
