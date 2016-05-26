# Install the JS SDK

There are several ways to install Skygear SDK to you app. You can either:

* Use the latest stable release on npm
* Install the latest development version

### Use the latest stable release on npm
You can install the Skygear JS SDK via [npm](https://www.npmjs.com/package/skygear). The SDK  package is available on the npm website.


``` bash
npm install skygear --save
```

### Install the latest development version

You can add the development branch GitHub Repository as a submodule in your project.

``` bash
git submodule git@github.com:skygeario/skygear-server.git
cd skygear
npm install
cd ..
npm install skygear/
```

## Include the SDK in your project

### Include in your npm project

The skygear JS SDK is assumed to be run in ES6 runtime. If you wish to run it in an older runtime, you need to require the polyfill before importing Skygear SDK.

``` js
import 'babel-polyfill';
import skygear from 'skygear';
```

### Include in react-native

``` js
require('babel-polyfill');
var React = require('react-native');

/* ... */

var skygear = require('skygear');
```

### Include in your website *(NOT YET IMPLEMENTED)*
Place these lines before the body closing tag `</body>`

``` html
<script src="//cdn.skygear.io/polyfill.min.js"></script>
<script src="//cdn.skygear.io/skygear.js"></script>
```
