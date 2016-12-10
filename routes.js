/* globals MarkdownFilePaths: false */
// MarkdownFilePaths are created in run.js and passed through webpack

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Landing from './pages/home/index';
import Guide from './pages/guide/index';
import GuideList from './pages/guideList/index';
import NotFound from './pages/error/index';
import ComingSoon from './pages/comingSoon';

// does not work when passing './content' as an variable
const req = require.context('./content', true, /^\.\/.*\.md/);

const routesForMarkdownFiles = MarkdownFilePaths.map(path => {
  const { title, html } = req(`./${path}`);
  const url = `${path.slice(0, -'.md'.length)}/`;
  console.log(`[Route generator] file ${path} -> url ${url}`);
  return <Route key={path} path={url} title={title} docHtml={html} />;
});

const routes = (
  <Route path="/">
    <IndexRoute title="Skygear Documentation" component={Landing} />
    <Route path="guides/" title="Guides" component={GuideList} />
    <Route path="guide" component={Guide}>
      {routesForMarkdownFiles}
    </Route>
    <Route path="coming-soon/" title="Coming Soon" component={ComingSoon} />
    <Route path="*" title="404: Not Found" component={NotFound} />
  </Route>
);

// Be sure to export the React component so that it can be statically rendered
export default routes;
