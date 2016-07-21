This guide will introduce an example web project that:
- Uses [React](https://facebook.github.io/react/) and Skygear
- Writes code in [ES2015](https://babeljs.io/docs/learn-es2015/) and
  [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) syntax
- Bundles JavaScript file with [Webpack](https://webpack.github.io/)

## Dependencies

Use `npm` to initialize your project and then edit your `package.json`.
Here, dependencies and devDependencies are updated, and two scripts
are created for building your project and starting a static server.

``` javascript
// package.json
{
  /* existing information */
  "dependencies": {
    "react": "^15.2.1",
    "react-dom": "^15.2.1",
    "skygear": "^0.14.0"
  },
  "devDependencies": {
    "babel-core": "^6.11.4",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.9.0",
    "babel-preset-react": "^6.11.1",
    "webpack": "^1.13.1",
    "http-server": "^1.14.1"
  },
  "scripts": {
    /* existing scripts */
    "dist": "mkdir -p dist && cp src/index.html dist/ && webpack",
    "server": "http-server dist -o",
  }
}
```

Remember to run `npm install` to resolve the dependencies.

## File Structure

``` bash
package.json         # npm project information
webpack.config.js    # webpack build configuration
node_modules/        # npm modules
src/                 # source folder
    index.html
    index.js
dist/                # build folder
```

## Webpack Configuration

Edit `webpack.config.js` as the following:

``` javascript
// webpack.config.js
var path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  externals: {
    'react-native': 'undefined',
    'websocket': 'undefined'
  },
  module: {
    loaders: [
      {
        test: /.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
}
```

Here is the `src/index.html` file:

``` html
<!-- src/index.html -->
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>React + Skygear</title>
</head>
<body>
  <div id="app">Now Loading...</div>
  <script src="bundle.js"></script>
</body>
</html>
```

And the `src/index.js` file:

``` javascript
// src/index.js
import 'babel-polyfill';
import skygear from 'skygear';
import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
  render() {
    return (<div>Hello React and Skygear</div>);
  }
}

skygear.config({
  'endPoint': 'https://<your-app-name>.skygeario.com/',
  'apiKey': '<your-api-key>',
}).then(() => {
  ReactDOM.render(<App />, document.getElementById('app'));
}, (error) => {
  console.error(error);
});
```

Now, running the command `npm run dist` will build your project and then
`npm run server` will start a static server that hosts your project. You
should be able to see "Hello React and Skygear" in your browser.