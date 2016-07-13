We will introduce one way to include skygear into your project under **npm**
environment. You are more than welcome to explore your own ways of using
Skygear JS SDK.

## Generate the example project

We will use [Yoeman](http://yeoman.io) to generate a new project that is
almost configured for **React.js** usage, and then we will modify it to integrate
Skygear JS SDK properly. Here is the [page](https://github.com/newtriks/generator-react-webpack)
introducing the generator.

``` bash
npm install -g yo # installs yoeman globally
npm install -g generator-react-webpack
```

After Yoeman and the generator are installed, just create a new folder as your
project folder and generate the code with generator.

``` bash
mkdir example-project && cd example-project
yo react-webpack
```

You will be prompted to enter several configurations for your generated project,
it doesn't really matter what you choose. Make sure all the dependencies are
installed properly. You can take a glance at the project folder.

## Include Skygear JS SDK

Simply run `npm install --save skygear`. Next, we need to take a few steps to
setup configurations for [Webpack](https://webpack.github.io/). Currently,
webpack is trying to take everything from the src folder, bundle them up all,
and write into a single JS file called `app.js`.
- LESS, SASS and other css files are compiled and included
- Other assets such as images are automatically copied over
- Babel is used to enable ES2015 features in all JS files
- Babel is configured to compile JSX syntax into plain JS
- Dependencies of `require` or `import` are resolved with webpack

However, webpack is not so intelligent when dealing with native node.js
modules or conditional dependencies such as the following one:

``` javascript
if (typeof window === 'undefined') {
  require('react-native');
}
```

In order to avoid these issues, we need to do some modifications to the
configuration files. First, let's modify **cfg/base.js**.

``` javascript
// cfg/base.js
/* ... */
module.exports = {
  /* ... */
  resolve: { /* ... */ },
  externals: {
    'react-native': 'undefined', // avoid loading react-native
    'localStorage': 'undefined', // we don't need this package
    'config': JSON.stringify({
      'skygear': {
        'endPoint': 'https://<your-app-name>.skygeario.com/',
        'apiKey': '<your-api-key>'
      }
    }) // it's better to save configuration for your skygear container here
  },
  module: {},
};
```

Next, [localforage](https://github.com/mozilla/localForage) module requires
`exports-loader` to be loaded properly with webpack, and
[websocket](https://www.npmjs.com/package/websocket) module requires
`json-loader`. Another thing is that, localforage is a prepackaged module, so
we don't want webpack to parse and analyze its dependencies any more.
We can install the loaders via `npm install --save json-loader exports-loader`,
and modify **cfg/default.js** to achieve these goals.

``` javascript
/* ... */
function getDefaultModules() {
  return {
    /* ... */
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /localforage/,
        loader: 'exports?localforage'
      },
      /* ... */
    ],
    noParse: [ /localforage\/dist\/localforage.js/ ],
  };
}
/* ... */
```

We are now ready to include skygear into our project! Just modify
**src/index.js** to include Skygear JS SDK and configure the container properly.

``` javascript
/* ... */
import App from '.components/Main';

import skygear from 'skygear';
import config from 'config'; // the config we set in cfg/base.js

skygear.config(config.skygear)
  .then((container) => {
    alert('Yay! We have skygear installed!');
  }, (error) => {
    alert(error);
  });

ReactDOM.render(<App />, document.getElementById('app'));
```

Now if we do `npm start`, the browser should automatically be fired, and
we should see the alert message saying `Yay! We have skygear installed!`.

## React Native usage (**Coming Soon**)
