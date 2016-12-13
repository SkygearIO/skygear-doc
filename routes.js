/* globals MarkdownFilePaths: false */
// MarkdownFilePaths are created in run.js and passed through webpack

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './pages/home/index';
import Guide from './pages/guide/index';
import GuideList from './pages/guideList/index';
import ApiReference from './pages/apiReference/index';
import Support from './pages/support/index';
import NotFound from './pages/error/index';
import ComingSoon from './pages/comingSoon';

import './components/Layout.scss';

// does not work when passing './content' as an variable
const req = require.context('./content', true, /^\.\/.*\.md/);

const routesForMarkdownFiles = MarkdownFilePaths.map(path => {
  const { title, html } = req(`./${path}`);
  const url = `guide/${path.slice(0, -'.md'.length)}/`;
  console.log(`[Route generator] file ${path} -> url ${url}`);
  return <Route key={path} path={url} component={Guide} title={title} docHtml={html} />;
});

const routes = (
  <Route path="/">
    <IndexRoute title="Skygear Documentation" component={Landing} />
    <Route path="guides/" title="Guides" component={GuideList} />
    {routesForMarkdownFiles}
    <Route path="api-reference/" title="API Reference" component={ApiReference} />
    <Route path="support/" title="Support" component={Support} />
    <Route path="coming-soon/" title="Coming Soon" component={ComingSoon} />
    <Route path="*" title="404: Not Found" component={NotFound} />
  </Route>
);

// Be sure to export the React component so that it can be statically rendered
export default routes;
