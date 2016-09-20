/* eslint-disable */
/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import glob from 'glob';
import fs from 'fs';
import { join } from 'path';
import { map, forEach } from 'lodash';

export default function(source) {
  this.cacheable();
  const target = this.target;
  const callback = this.async();

  if (target === 'node') {
    source = source.replace('import \'babel/polyfill\';', ''); // eslint-disable-line no-param-reassign
  }

  const routeGenerator = new Promise((resolve, reject) => {
    glob('**/*.json', { cwd: join(__dirname, '../../routes') }, (err, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  })
  .then((files) => {
    if (files.length === 0) {
      return Promise.resolve([]);
    }

    return Promise.all(
      map(files, perFile => new Promise((resolve, reject) => {
        const file = join(__dirname, '../../routes', perFile);
        fs.readFile(file, 'utf8', (err, data) => {
          if (err) {
            reject(err);
            return;
          }

          try {
            resolve(JSON.parse(data));
          } catch (err) {
            reject(err);
          }
        });
      }))
    );
  })
  .then((routeInfo) => {
    const factories = {};
    const lines = [];
    forEach(routeInfo, ({factory, routes}) => {
      factories[factory.name] = factory.path;

      forEach(routes, (perRouteData, perRouteName) => {
        const contentParam = `content: require("${perRouteData['content_path']}"),`;
        let menuParam = '';
        if (perRouteData['menu_path']) {
          menuParam = `menu: require("${perRouteData['menu_path']}"),`;
        }

        let line = '';
        if (target === 'node') {
          line = `'${perRouteName}': () => ${factory.name}({
                     name: "${perRouteData.name}",
                     title: "${perRouteData.title}",
                     ${contentParam}
                     ${menuParam}
                   }),`;
        } else {
          line = `'${perRouteName}': () => Promise.resolve(
                    ${factory.name}({
                      name: "${perRouteData.name}",
                      title: "${perRouteData.title}",
                      ${contentParam}
                      ${menuParam}
                    })
                  ),`;
        }

        console.log(`[Route Generator] "${perRouteName}" --> ${perRouteData['content_path']}`);
        lines.push(line);
      });
    });

    return { factories, lines };
  });

  // Static Routes Loader
  const staticRoutesLoader = new Promise((resolve, reject) => {
    glob('**/*.{js,jsx}', { cwd: join(__dirname, '../../pages') }, (err, files) => {
      if (err) {
        return reject(err);
      }

      const lines = files.map(file => {
        let path = '/' + file;

        if (path === '/index.js' || path === '/index.jsx') {
          path = '/';
        } else if (path.endsWith('/index.js')) {
          path = path.substr(0, path.length - 9);
        } else if (path.endsWith('/index.jsx')) {
          path = path.substr(0, path.length - 10);
        } else if (path.endsWith('.js')) {
          path = path.substr(0, path.length - 3);
        } else if (path.endsWith('.jsx')) {
          path = path.substr(0, path.length - 4);
        }

        console.log(`[Route Loader] "${path}" --> ${file}`);
        if (target === 'node' || path === '/404' || path === '/500') {
          return `  '${path}': () => require('./pages/${file}'),`;
        }

        return `  '${path}': () => new Promise(resolve => require(['./pages/${file}'], resolve)),`;
      });

      if (lines.length) {
        resolve(lines);
      } else {
        reject(new Error('Cannot find any routes.'));
      }
    });
  });

  Promise.all([routeGenerator, staticRoutesLoader])
  .then(([generatedRoutes, staticRouteLines]) => {
    forEach(generatedRoutes.factories, (perFactoryPath, perFactoryName) => {
      source = `import ${perFactoryName} from '${perFactoryPath}';\n` + source;
    });

    source = source.replace(
      ' routes = {',
      ` routes = {
        ${generatedRoutes.lines.join('')}
        ${staticRouteLines.join('')}`
    );

    callback(null, source);
  }, function(err) {
    callback(err);
  });
}
