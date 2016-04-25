/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from 'glob';
import { join, dirname } from 'path';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Html from '../components/Html';
import task from './lib/task';
import fs from './lib/fs';

const DEBUG = !process.argv.includes('release');

async function renderRoute(route, component) {
  let path = route;
  if (!path.endsWith('/')) {
    path += '/';
  }
  path += "index.html";

  const file = join(__dirname, '../build', path);
  const data = { body: ReactDOM.renderToString(component) };
  const html = '<!doctype html>\n' +
    ReactDOM.renderToStaticMarkup(<Html debug={DEBUG} {...data} />);

  console.log(`[Renderer] "${route}" --> ${file}`);

  await fs.mkdir(dirname(file));
  await fs.writeFile(file, html);
}

export default task(async function render() {
  const { route, routes } = require('../build/app.node');

  for(const perRoute in routes) {
    await route(perRoute, renderRoute.bind(undefined, perRoute));
  }
});
